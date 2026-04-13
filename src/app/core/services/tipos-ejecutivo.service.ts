import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoEjecutivo } from '../models/tipo-ejecutivo.model';

@Injectable({
    providedIn: 'root'
})
export class TiposEjecutivoService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/tipos-ejecutivo`;

    getTipos(page: number = 1, perPage: number = 20): Observable<{ tipos: TipoEjecutivo[], total: number }> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('per_page', perPage.toString());

        return this.http.get<{ status: string, data: any }>(this.apiUrl, { params }).pipe(
            map(res => ({
                tipos: res.data.tipos_ejecutivo,
                total: res.data.total
            }))
        );
    }

    getTipoById(id: number): Observable<TipoEjecutivo> {
        return this.http.get<{ data: { tipo_ejecutivo: TipoEjecutivo } }>(`${this.apiUrl}/${id}`).pipe(
            map(res => res.data.tipo_ejecutivo)
        );
    }

    createTipo(tipo: TipoEjecutivo): Observable<any> {
        return this.http.post(this.apiUrl, tipo);
    }

    updateTipo(id: number, tipo: Partial<TipoEjecutivo>): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, tipo);
    }

    deleteTipo(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}