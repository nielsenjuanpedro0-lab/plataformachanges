import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.page').then(m => m.LoginPage)
  },

  // ==============================================================
  // 1. MUNDO EJECUTIVO / SUPERADMIN (Tu panel principal)
  // ==============================================================
  {
    path: 'home',
    loadComponent: () => import('./layouts/ejecutivo-layout/ejecutivo-layout.component').then(m => m.EjecutivoLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.page').then(m => m.DashboardPage) },
      { path: 'usuarios', loadComponent: () => import('./features/usuarios/usuarios.page').then(m => m.UsuariosPage) },
      { path: 'tickets', loadComponent: () => import('./features/dashboard/dashboard.page').then(m => m.DashboardPage) },
      { path: 'cotizador', loadComponent: () => import('./features/dashboard/dashboard.page').then(m => m.DashboardPage) },
      { path: 'reportes', loadComponent: () => import('./features/dashboard/dashboard.page').then(m => m.DashboardPage) },
      { path: 'areas', loadComponent: () => import('./features/areas/areas.page').then(m => m.AreasPage) },
      { path: 'sucursales', loadComponent: () => import('./features/sucursales/sucursales.page').then(m => m.SucursalesPage) },
      // El ABM de Productores que ve el Ejecutivo:
      { path: 'pas', loadComponent: () => import('./features/pas/pas.page').then(m => m.PasPage) },
      { path: 'pas-asignaciones', loadComponent: () => import('./features/pas-asignaciones/pas-asignaciones.page').then(m => m.PasAsignacionesPage) }
    ]
  },

  // ==============================================================
  // 2. MUNDO ORGANIZADOR
  // ==============================================================
  {
    path: 'organizador',
    loadComponent: () => import('./layouts/organizador-layout/organizador-layout.component').then(m => m.OrganizadorLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // Basado en tu captura de pantalla, la carpeta se llama "organizadores"
      { path: 'dashboard', loadComponent: () => import('./features/organizadores/dashboard/dashboard.page').then(m => m.DashboardPage) }
    ]
  },

  // ==============================================================
  // 3. MUNDO PRODUCTOR (PAS)
  // ==============================================================
  {
    path: 'pas', // Esta es la ruta raíz del PAS (localhost:8100/pas/...)
    loadComponent: () => import('./layouts/pas-layout/pas-layout.component').then(m => m.PasLayoutComponent),
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', loadComponent: () => import('./features/pas/inicio/inicio.page').then(m => m.InicioPage) },
      // Acá conectaremos la página de tickets cuando la crees en features/pas/tickets:
      // { path: 'mis-tickets', loadComponent: () => import('./features/pas/tickets/tickets.page').then(m => m.TicketsPage) }
    ]
  },

  // ==============================================================
  // RUTA SALVAVIDAS (Si escriben cualquier verdura en la URL)
  // ==============================================================
  { path: '**', redirectTo: 'login' }
];