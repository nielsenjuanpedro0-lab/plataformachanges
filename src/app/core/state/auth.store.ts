import { Injectable, signal, computed } from '@angular/core';
import { AuthContext } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private readonly state = signal<AuthContext | null>(null);

  readonly context = this.state.asReadonly();
  readonly user = computed(() => this.state()?.user ?? null);
  readonly perfil = computed(() => this.state()?.perfil ?? null);
  readonly permissions = computed(() => this.state()?.permissions ?? []);
  readonly uiContext = computed(() => this.state()?.ui_context ?? null);
  readonly businessContext = computed(() => this.state()?.business_context ?? null);
  
  readonly isAuthenticated = computed(() => this.state() !== null);

  setContext(context: AuthContext) {
    this.state.set(context);
  }

  clearContext() {
    this.state.set(null);
  }

  hasPermission(permission: string): boolean {
    return this.permissions().includes(permission);
  }
}