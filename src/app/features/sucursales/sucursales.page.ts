import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
    addOutline, createOutline, trashOutline, businessOutline, add,
    closeOutline, saveOutline, warningOutline, chevronDownOutline,
    checkmark, searchOutline, locationOutline, callOutline, mailOutline
} from 'ionicons/icons';

import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
    selector: 'app-sucursales',
    templateUrl: './sucursales.page.html',
    styleUrls: ['./sucursales.page.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule, HeaderComponent]
})
export class SucursalesPage implements OnInit {

    sucursales: any[] = [];
    filteredSucursales: any[] = [];
    searchTerm: string = '';
    isLoading: boolean = true;

    isModalOpen: boolean = false;
    isDeleteModalOpen: boolean = false;

    sucursalForm: FormGroup;
    editingId: number | null = null;
    sucursalToDelete: any = null;

    constructor(private fb: FormBuilder) {
        addIcons({
            'add-outline': addOutline, 'create-outline': createOutline, 'trash-outline': trashOutline,
            'business-outline': businessOutline, 'add': add, 'close-outline': closeOutline,
            'save-outline': saveOutline, 'warning-outline': warningOutline, 'chevron-down-outline': chevronDownOutline,
            'checkmark': checkmark, 'search-outline': searchOutline, 'location-outline': locationOutline,
            'call-outline': callOutline, 'mail-outline': mailOutline
        });

        this.sucursalForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(3)]],
            codigo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]+$/)]],
            direccion: ['', [Validators.required]],
            localidad: ['', [Validators.required]],
            provincia: ['', [Validators.required]],
            codigo_postal: ['', [Validators.required]], // EL CAMPO DE CRISTHIAN
            email: ['', [Validators.required, Validators.email]],
            telefono: ['', [Validators.required]],
            estado_id: [1, Validators.required]
        });
    }

    ngOnInit() {
        setTimeout(() => {
            this.sucursales = [
                {
                    id: 1, codigo: 'SUC-001', nombre: 'Sucursal Centro',
                    direccion: 'Calle 62 N° 3000', localidad: 'Necochea', provincia: 'Buenos Aires', codigo_postal: '7630',
                    email: 'centro@argbroker.com', telefono: '02262 42-0000', estado_id: 1,
                    usuarios_internos_count: 5, pas_count: 12
                },
                {
                    id: 2, codigo: 'SUC-002', nombre: 'Sucursal Playa',
                    direccion: 'Av. 2 N° 4000', localidad: 'Necochea', provincia: 'Buenos Aires', codigo_postal: '7630',
                    email: 'playa@argbroker.com', telefono: '02262 43-1111', estado_id: 1,
                    usuarios_internos_count: 3, pas_count: 8
                }
            ];
            this.applyFilters();
            this.isLoading = false;
        }, 800);
    }

    applyFilters() {
        const search = this.searchTerm.toLowerCase().trim();
        this.filteredSucursales = this.sucursales.filter(s =>
            s.nombre.toLowerCase().includes(search) ||
            s.codigo.toLowerCase().includes(search) ||
            s.codigo_postal.toLowerCase().includes(search)
        );
    }

    nuevaSucursal() {
        this.editingId = null;
        this.sucursalForm.reset({ estado_id: 1 });
        this.isModalOpen = true;
    }

    editarSucursal(suc: any) {
        this.editingId = suc.id;
        this.sucursalForm.patchValue(suc);
        this.isModalOpen = true;
    }

    cerrarModal() {
        this.isModalOpen = false;
    }

    guardarSucursal() {
        if (this.sucursalForm.invalid) return;
        const formData = this.sucursalForm.value;

        if (this.editingId) {
            const index = this.sucursales.findIndex(s => s.id === this.editingId);
            if (index !== -1) {
                // Mantenemos los contadores al actualizar
                this.sucursales[index] = { ...this.sucursales[index], ...formData };
            }
        } else {
            const newId = Math.max(...this.sucursales.map(s => s.id), 0) + 1;
            // Inicializamos contadores en 0 para nuevas sucursales
            this.sucursales.push({ id: newId, ...formData, usuarios_internos_count: 0, pas_count: 0 });
        }

        this.applyFilters();
        this.cerrarModal();
    }

    abrirEliminar(suc: any) {
        this.sucursalToDelete = suc;
        this.isDeleteModalOpen = true;
    }

    cerrarEliminar() {
        this.isDeleteModalOpen = false;
        setTimeout(() => this.sucursalToDelete = null, 300);
    }

    confirmarEliminacion() {
        if (this.sucursalToDelete) {
            this.sucursales = this.sucursales.filter(s => s.id !== this.sucursalToDelete.id);
            this.applyFilters();
        }
        this.cerrarEliminar();
    }
}