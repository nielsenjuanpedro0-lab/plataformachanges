import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AreaEmpresa } from '../models/area-empresa.model';

@Injectable({
    providedIn: 'root'
})
export class AreasService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/areas-empresa`;

    getAreas(page: number = 1, perPage: number = 20): Observable<{ areas: AreaEmpresa[], total: number }> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('per_page', perPage.toString());

        return this.http.get<{ status: string, data: any }>(this.apiUrl, { params }).pipe(
            map(res => ({
                areas: res.data.areas_empresa,
                total: res.data.total
            }))
        );
    }

    getAreaById(id: number): Observable<AreaEmpresa> {
        return this.http.get<{ data: { area_empresa: AreaEmpresa } }>(`${this.apiUrl}/${id}`).pipe(
            map(res => res.data.area_empresa)
        );
    }

    createArea(area: AreaEmpresa): Observable<any> {
        return this.http.post(this.apiUrl, area);
    }

    updateArea(id: number, area: Partial<AreaEmpresa>): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, area);
    }

    deleteArea(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}