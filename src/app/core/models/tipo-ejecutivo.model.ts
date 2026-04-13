export interface TipoEjecutivo {
    id?: number;
    nombre: string;
    codigo: string;
    descripcion?: string | null;
    estado_id: number;
}