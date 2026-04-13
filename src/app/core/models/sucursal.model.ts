export interface Sucursal {
  id?: number;
  nombre: string;
  codigo: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  ciudad_id?: number;
  provincia_id?: number;
  estado_id: number;
}