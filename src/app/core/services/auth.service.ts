import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  currentUser = signal<any>(null);

  login(credentials: { identifier: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(res => {
        console.log('Login response received:', { status: res.status, hasToken: !!res?.data?.token });
        
        // Soportar tanto 'success' como boolean true
        const isSuccess = res.status === 'success' || res.status === true;
        
        if (isSuccess && res.data?.token) {
          localStorage.setItem('token', res.data.token);
          console.log('Token stored in localStorage');
        } else {
          console.warn('Login successful but no token received or status not recognized', res);
        }
      }),
      map(res => {
        // Si no hay token, forzamos un error para que el flujo no siga al loadContext
        if (!(res.data?.token)) {
          throw { status: 401, error: 'No se recibió un token válido del servidor.' };
        }
        return res;
      })
    );
  }

  loadContext(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/context`).pipe(
      map(res => res.data),
      tap(context => this.currentUser.set(context))
    );
  }

  hasPermission(permission: string): boolean {
    const user = this.currentUser();
    if (!user || !user.permissions) {
      return false;
    }
    return user.permissions.includes(permission);
  }

  getTokenSync(): string | null {
    return localStorage.getItem('token');
  }

  async logout(): Promise<void> {
    try {
      await this.http.post(`${this.apiUrl}/auth/logout`, {}).toPromise();
    } catch (e) {
      console.error('Error during logout request', e);
    } finally {
      localStorage.removeItem('token');
      this.currentUser.set(null);
    }
  }
}