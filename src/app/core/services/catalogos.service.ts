import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AreaEmpresaCatalogo, TipoEjecutivoCatalogo } from '../models/catalogos.model';

@Injectable({
    providedIn: 'root'
})
export class CatalogosService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/catalogos`;

    getAreasEmpresa(): Observable<AreaEmpresaCatalogo[]> {
        return this.http.get<{ data: AreaEmpresaCatalogo[] }>(`${this.apiUrl}/areas-empresa`).pipe(
            map(res => res.data)
        );
    }

    getTiposEjecutivo(): Observable<TipoEjecutivoCatalogo[]> {
        return this.http.get<{ data: TipoEjecutivoCatalogo[] }>(`${this.apiUrl}/tipos-ejecutivo`).pipe(
            map(res => res.data)
        );
    }
}