import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
    timeOutline,
    fingerPrintOutline,
    codeSlashOutline,
    searchOutline,
    eyeOutline,
    closeOutline,
    filterOutline,
    earthOutline,
    laptopOutline
} from 'ionicons/icons';

@Component({
    selector: 'app-auditoria',
    templateUrl: './auditoria.page.html',
    styleUrls: ['./auditoria.page.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule]
})
export class AuditoriaPage implements OnInit {

    isLoading: boolean = true;
    eventos: any[] = [];
    selectedEvento: any = null;
    isModalOpen: boolean = false;

    constructor() {
        addIcons({
            timeOutline, fingerPrintOutline, codeSlashOutline,
            searchOutline, eyeOutline, closeOutline, filterOutline,
            earthOutline, laptopOutline
        });
    }

    ngOnInit() {
        // Datos basados en el ejemplo de respuesta del Postman
        setTimeout(() => {
            this.eventos = [
                {
                    id: "1",
                    user_id: "1",
                    usuario_nombre: "Administrador",
                    accion: "login",
                    modulo: "auth",
                    descripcion: "Login exitoso: administrador",
                    ip_address: "127.0.0.1",
                    user_agent: "Chrome / Windows 11",
                    created_at: "2026-04-10 14:00:00",
                    payload_before: null,
                    payload_after: null
                },
                {
                    id: "2",
                    user_id: "1",
                    usuario_nombre: "Juan Nielsen",
                    accion: "editar",
                    modulo: "sucursales",
                    descripcion: "Sucursal actualizada: Sucursal Centro",
                    ip_address: "192.168.1.50",
                    user_agent: "Ionic App / Android",
                    created_at: "2026-04-10 14:05:00",
                    payload_before: { nombre: "Sucursal Vieja", telefono: "011-4444-0000" },
                    payload_after: { nombre: "Sucursal Centro", telefono: "011-4444-1111" }
                }
            ];
            this.isLoading = false;
        }, 800);
    }

    verDetalle(evento: any) {
        this.selectedEvento = evento;
        this.isModalOpen = true;
    }

    cerrarModal() {
        this.isModalOpen = false;
        this.selectedEvento = null;
    }
}