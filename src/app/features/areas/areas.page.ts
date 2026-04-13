import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
    addOutline,
    createOutline,
    trashOutline,
    businessOutline,
    add,
    closeOutline,
    saveOutline,
    warningOutline,
    chevronDownOutline,
    checkmark,
    searchOutline,
    layersOutline,
    pinOutline,
    cardOutline,
    documentTextOutline
} from 'ionicons/icons';

import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
    selector: 'app-areas',
    templateUrl: './areas.page.html',
    styleUrls: ['./areas.page.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule, HeaderComponent]
})
export class AreasPage implements OnInit {

    areas: any[] = [];
    filteredAreas: any[] = [];
    searchTerm: string = '';
    isLoading: boolean = true;

    isDropdownOpen: boolean = false;
    isModalOpen: boolean = false;
    areaForm: FormGroup;
    editingId: number | null = null;

    isDeleteModalOpen: boolean = false;
    areaToDelete: any = null;

    constructor(private fb: FormBuilder) {
        addIcons({
            'add-outline': addOutline,
            'create-outline': createOutline,
            'trash-outline': trashOutline,
            'business-outline': businessOutline,
            'add': add,
            'chevron-down-outline': chevronDownOutline,
            'checkmark': checkmark,
            'close-outline': closeOutline,
            'save-outline': saveOutline,
            'warning-outline': warningOutline,
            'search-outline': searchOutline,
            'layers-outline': layersOutline,
            'pin-outline': pinOutline,
            'card-outline': cardOutline,
            'document-text-outline': documentTextOutline
        });

        this.areaForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(3)]],
            codigo: ['', [Validators.required, Validators.pattern(/^[a-z_]+$/)]],
            descripcion: ['', [Validators.maxLength(500)]], // Campo de Cristhian
            estado_id: [1, Validators.required]
        });
    }

    ngOnInit() {
        setTimeout(() => {
            this.areas = [
                { id: 1, codigo: 'ejec_cuenta', nombre: 'Ejecutivo de Cuenta', estado_id: 1 },
                { id: 2, codigo: 'ejec_siniestros', nombre: 'Ejecutivo de Siniestros', estado_id: 1 },
                { id: 3, codigo: 'admin_central', nombre: 'Administración', estado_id: 1 },
                { id: 4, codigo: 'gerencia', nombre: 'Gerencia', estado_id: 0 }
            ];
            this.applyFilters();
            this.isLoading = false;
        }, 800);
    }

    applyFilters() {
        const search = this.searchTerm.toLowerCase().trim();
        this.filteredAreas = this.areas.filter(a =>
            a.nombre.toLowerCase().includes(search) || a.codigo.toLowerCase().includes(search)
        );
    }

    nuevaArea() {
        this.editingId = null;
        this.areaForm.reset({ estado_id: 1 });
        this.isModalOpen = true;
    }

    editarArea(area: any) {
        this.editingId = area.id;
        this.areaForm.patchValue({
            nombre: area.nombre,
            codigo: area.codigo,
            descripcion: area.descripcion || '',
            estado_id: area.estado_id
        });
        this.isModalOpen = true;
    }

    cerrarModal() {
        this.isModalOpen = false;
        this.isDropdownOpen = false;
    }

    guardarArea() {
        if (this.areaForm.invalid) return;

        const formData = this.areaForm.value;

        if (this.editingId) {
            const index = this.areas.findIndex(a => a.id === this.editingId);
            if (index !== -1) {
                this.areas[index] = { ...this.areas[index], ...formData };
            }
        } else {
            const newId = Math.max(...this.areas.map(a => a.id), 0) + 1;
            this.areas.push({ id: newId, ...formData });
        }

        this.applyFilters();
        this.cerrarModal();
    }

    abrirEliminar(area: any) {
        this.areaToDelete = area;
        this.isDeleteModalOpen = true;
    }

    cerrarEliminar() {
        this.isDeleteModalOpen = false;
        setTimeout(() => this.areaToDelete = null, 300);
    }

    confirmarEliminacion() {
        if (this.areaToDelete) {
            this.areas = this.areas.filter(a => a.id !== this.areaToDelete.id);
            this.applyFilters();
        }
        this.cerrarEliminar();
    }

    // --- FUNCIONES RESTAURADAS PARA EL DROPDOWN DEL HTML ---

    toggleDropdown(event: Event) {
        event.stopPropagation();
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    selectEstado(value: number) {
        this.areaForm.patchValue({ estado_id: value });
        this.isDropdownOpen = false;
    }

    getEstadoLabel(): string {
        return this.areaForm.get('estado_id')?.value === 1 ? 'Activo' : 'Inactivo';
    }

    clickOutsideDropdown(event: Event) {
        this.isDropdownOpen = false;
    }
}