import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
    addOutline, createOutline, trashOutline, linkOutline, add,
    closeOutline, saveOutline, warningOutline, chevronDownOutline,
    searchOutline, personOutline, businessOutline, peopleOutline // Importante agregar peopleOutline
} from 'ionicons/icons';

import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
    selector: 'app-pas-asignaciones',
    templateUrl: './pas-asignaciones.page.html',
    styleUrls: ['./pas-asignaciones.page.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule, HeaderComponent]
})
export class PasAsignacionesPage implements OnInit {

    asignaciones: any[] = [];
    filteredAsignaciones: any[] = [];
    searchTerm: string = '';
    isLoading: boolean = true;

    // Listas para los selects del formulario
    productoresDisponibles: any[] = [];
    sucursalesDisponibles: any[] = [];
    organizadoresDisponibles: any[] = []; // <-- LA NUEVA LISTA

    isModalOpen: boolean = false;
    isDeleteModalOpen: boolean = false;

    asignacionForm: FormGroup;
    editingId: number | null = null;
    asignacionToDelete: any = null;

    constructor(private fb: FormBuilder) {
        addIcons({
            'add-outline': addOutline, 'create-outline': createOutline, 'trash-outline': trashOutline,
            'link-outline': linkOutline, 'add': add, 'close-outline': closeOutline,
            'save-outline': saveOutline, 'warning-outline': warningOutline, 'chevron-down-outline': chevronDownOutline,
            'search-outline': searchOutline, 'person-outline': personOutline, 'business-outline': businessOutline,
            'people-outline': peopleOutline // Registrado para la UI
        });

        this.asignacionForm = this.fb.group({
            pas_id: ['', [Validators.required]],
            sucursal_id: ['', [Validators.required]],
            organizador_id: [null], // <-- EL NUEVO CAMPO (Opcional)
            estado_id: [1, Validators.required]
        });
    }

    ngOnInit() {
        // Simulamos la carga de datos de la API de Cristhian
        setTimeout(() => {
            this.productoresDisponibles = [
                { id: 1, nombre: 'Juan Pérez', matricula: 'SSN-12345' },
                { id: 2, nombre: 'María Gómez', matricula: 'SSN-67890' },
                { id: 3, nombre: 'Carlos López', matricula: 'SSN-11223' }
            ];

            this.sucursalesDisponibles = [
                { id: 1, nombre: 'Sucursal Centro' },
                { id: 2, nombre: 'Sucursal Playa' }
            ];

            // <-- DATOS DE PRUEBA DE ORGANIZADORES
            this.organizadoresDisponibles = [
                { id: 1, nombre: 'Organizador Litoral' },
                { id: 2, nombre: 'Organizador Sur' }
            ];

            // <-- DATOS DE PRUEBA INICIALES (Ya con la estructura del organizador)
            this.asignaciones = [
                {
                    id: 1,
                    pas_id: 1,
                    pas_nombre: 'Juan Pérez',
                    sucursal_id: 1,
                    sucursal_nombre: 'Sucursal Centro',
                    organizador_id: 1,
                    organizador_nombre: 'Organizador Litoral',
                    estado_id: 1
                },
                {
                    id: 2,
                    pas_id: 2,
                    pas_nombre: 'María Gómez',
                    sucursal_id: 2,
                    sucursal_nombre: 'Sucursal Playa',
                    organizador_id: null,
                    organizador_nombre: 'Directo', // Caso de venta directa
                    estado_id: 1
                }
            ];

            this.applyFilters();
            this.isLoading = false;
        }, 800);
    }

    applyFilters() {
        const search = this.searchTerm.toLowerCase().trim();
        this.filteredAsignaciones = this.asignaciones.filter(a =>
            a.pas_nombre.toLowerCase().includes(search) ||
            a.sucursal_nombre.toLowerCase().includes(search) ||
            (a.organizador_nombre && a.organizador_nombre.toLowerCase().includes(search))
        );
    }

    nuevaAsignacion() {
        this.editingId = null;
        this.asignacionForm.reset({ estado_id: 1, organizador_id: null });
        this.isModalOpen = true;
    }

    editarAsignacion(asignacion: any) {
        this.editingId = asignacion.id;
        this.asignacionForm.patchValue(asignacion);
        this.isModalOpen = true;
    }

    cerrarModal() {
        this.isModalOpen = false;
    }

    guardarAsignacion() {
        if (this.asignacionForm.invalid) return;

        const formData = this.asignacionForm.value;

        // Buscamos los nombres correspondientes para mostrarlos en la tarjeta
        const pasSeleccionado = this.productoresDisponibles.find(p => p.id == formData.pas_id);
        const sucSeleccionada = this.sucursalesDisponibles.find(s => s.id == formData.sucursal_id);
        const orgSeleccionado = this.organizadoresDisponibles.find(o => o.id == formData.organizador_id);

        const dataCompleta = {
            ...formData,
            pas_nombre: pasSeleccionado?.nombre,
            sucursal_nombre: sucSeleccionada?.nombre,
            organizador_nombre: orgSeleccionado ? orgSeleccionado.nombre : 'Directo' // <-- LÓGICA DEL ORGANIZADOR
        };

        if (this.editingId) {
            const index = this.asignaciones.findIndex(a => a.id === this.editingId);
            if (index !== -1) {
                this.asignaciones[index] = { ...this.asignaciones[index], ...dataCompleta };
            }
        } else {
            const newId = Math.max(...this.asignaciones.map(a => a.id), 0) + 1;
            this.asignaciones.push({ id: newId, ...dataCompleta });
        }

        this.applyFilters();
        this.cerrarModal();
    }

    abrirEliminar(asignacion: any) {
        this.asignacionToDelete = asignacion;
        this.isDeleteModalOpen = true;
    }

    cerrarEliminar() {
        this.isDeleteModalOpen = false;
        setTimeout(() => this.asignacionToDelete = null, 300);
    }

    confirmarEliminacion() {
        if (this.asignacionToDelete) {
            this.asignaciones = this.asignaciones.filter(a => a.id !== this.asignacionToDelete.id);
            this.applyFilters();
        }
        this.cerrarEliminar();
    }
}