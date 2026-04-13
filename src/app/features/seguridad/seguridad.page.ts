import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
    shieldCheckmarkOutline, lockOpenOutline, keyOutline,
    peopleOutline, chevronForwardOutline, checkmarkCircle,
    closeCircleOutline, settingsOutline, searchOutline
} from 'ionicons/icons';

@Component({
    selector: 'app-seguridad',
    templateUrl: './seguridad.page.html',
    styleUrls: ['./seguridad.page.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class SeguridadPage implements OnInit {

    isLoading: boolean = true;
    grupos: any[] = [];
    permisos: any[] = [];
    selectedGroup: any = null;

    constructor() {
        addIcons({
            shieldCheckmarkOutline, lockOpenOutline, keyOutline,
            peopleOutline, chevronForwardOutline, checkmarkCircle,
            closeCircleOutline, settingsOutline, searchOutline
        });
    }

    ngOnInit() {
        // Datos simulados del punto 11.1 y 11.2 del Postman
        setTimeout(() => {
            this.grupos = [
                { alias: 'superadmin', title: 'Super Administrador', description: 'Acceso total al sistema', permissions_count: 25 },
                { alias: 'broker_admin', title: 'Admin Broker', description: 'Administración total del broker', permissions_count: 20 },
                { alias: 'ejecutivo', title: 'Ejecutivo', description: 'Gestión operativa diaria', permissions_count: 12 },
                { alias: 'pas', title: 'Productor (PAS)', description: 'Acceso limitado a su propia cartera', permissions_count: 8 }
            ];

            this.permisos = [
                { key: 'usuarios.listar', description: 'Listar usuarios', module: 'usuarios' },
                { key: 'usuarios.crear', description: 'Crear nuevos usuarios', module: 'usuarios' },
                { key: 'pas.listar', description: 'Ver lista de PAS', module: 'pas' },
                { key: 'auditoria.ver', description: 'Consultar logs de sistema', module: 'seguridad' }
            ];

            this.selectedGroup = this.grupos[0];
            this.isLoading = false;
        }, 800);
    }

    selectGroup(group: any) {
        this.selectedGroup = group;
    }
}