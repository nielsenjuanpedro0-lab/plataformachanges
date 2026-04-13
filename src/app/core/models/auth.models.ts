export interface UserProfile {
  id: number;
  tipo_perfil: string;
  nombre: string;
  apellido: string;
  telefono: string;
  avatar_url: string | null;
  pas_id: number | null;
  organizador_id: number | null;
  estado_id: number;
  puede_administrar_usuarios_pas: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  active: boolean;
  groups: string[];
}

export interface BusinessContext {
  scope_type: 'broker' | 'organizador' | 'pas';
  broker_access: boolean;
  organizador: { id: number; nombre: string } | null;
  pas: { id: number; nombre_o_razon_social: string } | null;
}

export interface UiContext {
  puede_ver_usuarios: boolean;
  puede_ver_organizadores: boolean;
  puede_ver_pas: boolean;
  puede_administrar_usuarios_pas: boolean;
  scope_type: string;
}

export interface AuthContext {
  user: User;
  group: string;
  permissions: string[];
  perfil: UserProfile;
  business_context: BusinessContext;
  ui_context: UiContext;
}