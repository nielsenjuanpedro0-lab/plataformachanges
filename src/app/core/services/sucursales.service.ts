import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sucursal } from '../models/sucursal.model';

@Injectable({
    providedIn: 'root'
})
export class SucursalesService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/sucursales`;

    getSucursales(page: number = 1, perPage: number = 20): Observable<{ sucursales: Sucursal[], total: number }> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('per_page', perPage.toString());

        return this.http.get<{ status: string, data: any }>(this.apiUrl, { params }).pipe(
            map(res => ({
                sucursales: res.data.sucursales,
                total: res.data.total
            }))
        );
    }

    getSucursalById(id: number): Observable<Sucursal> {
        return this.http.get<{ data: { sucursal: Sucursal } }>(`${this.apiUrl}/${id}`).pipe(
            map(res => res.data.sucursal)
        );
    }

    createSucursal(sucursal: Sucursal): Observable<any> {
        return this.http.post(this.apiUrl, sucursal);
    }

    updateSucursal(id: number, sucursal: Partial<Sucursal>): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, sucursal);
    }

    deleteSucursal(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}