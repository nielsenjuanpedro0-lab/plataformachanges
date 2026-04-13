export interface Usuario {
    id?: number;
    nombre: string;
    apellido: string;
    email: string;
    username: string;
    password?: string;
    sucursal_id: number;
    area_empresa_id: number;
    tipo_ejecutivo_id: number;
    estado_id: number;
    ultimo_login?: string;
    created_at?: string;
}