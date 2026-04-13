import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    peopleOutline
} from 'ionicons/icons';

@Component({
    selector: 'app-tipos-ejecutivo',
    templateUrl: './tipos-ejecutivo.page.html',
    styleUrls: ['./tipos-ejecutivo.page.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class TiposEjecutivoPage implements OnInit {

    tipos: any[] = [];
    isLoading: boolean = true;

    isModalOpen: boolean = false;
    tipoForm: FormGroup;
    editingId: number | null = null;

    isDeleteModalOpen: boolean = false;
    tipoToDelete: any = null;
    isDropdownOpen: boolean = false;

    constructor(private fb: FormBuilder) {
        addIcons({
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
            peopleOutline
        });

        this.tipoForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(3)]],
            codigo: ['', [Validators.required, Validators.pattern(/^[a-z_]+$/)]],
            campo_pas: ['', [Validators.pattern(/^[a-z_]+$/)]],
            estado_id: [1, Validators.required]
        });
    }

    ngOnInit() {
        setTimeout(() => {
            this.tipos = [
                { id: 1, codigo: 'ejecutivo_cuenta', nombre: 'Ejecutivo de Cuenta', campo_pas: 'ejecutivo_cuenta_user_id', estado_id: 1 },
                { id: 2, codigo: 'ejecutivo_siniestros', nombre: 'Ejecutivo de Siniestros', campo_pas: 'ejecutivo_siniestros_user_id', estado_id: 1 },
                { id: 3, codigo: 'ejecutivo_cobranzas', nombre: 'Ejecutivo de Cobranzas', campo_pas: 'ejecutivo_cobranzas_user_id', estado_id: 1 },
                { id: 4, codigo: 'ejecutivo_operaciones', nombre: 'Ejecutivo de Operaciones', campo_pas: 'ejecutivo_operaciones_user_id', estado_id: 1 }
            ];
            this.isLoading = false;
        }, 800);
    }

    nuevoTipo() {
        this.editingId = null;
        this.tipoForm.reset({ estado_id: 1 });
        this.isModalOpen = true;
    }

    editarTipo(tipo: any) {
        this.editingId = tipo.id;
        this.tipoForm.patchValue({
            nombre: tipo.nombre,
            codigo: tipo.codigo,
            campo_pas: tipo.campo_pas,
            estado_id: tipo.estado_id
        });
        this.isModalOpen = true;
    }

    cerrarModal() {
        this.isModalOpen = false;
        this.isDropdownOpen = false;
    }

    guardarTipo() {
        if (this.tipoForm.invalid) return;

        const formData = this.tipoForm.value;

        if (this.editingId) {
            const index = this.tipos.findIndex(t => t.id === this.editingId);
            if (index !== -1) {
                this.tipos[index] = { ...this.tipos[index], ...formData };
            }
        } else {
            const newId = Math.max(...this.tipos.map(t => t.id)) + 1;
            this.tipos.push({ id: newId, ...formData });
        }

        this.cerrarModal();
    }

    abrirEliminar(tipo: any) {
        this.tipoToDelete = tipo;
        this.isDeleteModalOpen = true;
    }

    cerrarEliminar() {
        this.isDeleteModalOpen = false;
        setTimeout(() => this.tipoToDelete = null, 300);
    }

    confirmarEliminacion() {
        if (this.tipoToDelete) {
            this.tipos = this.tipos.filter(t => t.id !== this.tipoToDelete.id);
        }
        this.cerrarEliminar();
    }

    toggleDropdown(event: Event) {
        event.stopPropagation();
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    selectEstado(value: number) {
        this.tipoForm.patchValue({ estado_id: value });
        this.isDropdownOpen = false;
    }

    getEstadoLabel(): string {
        return this.tipoForm.get('estado_id')?.value === 1 ? 'Activo' : 'Inactivo';
    }

    clickOutsideDropdown(event: Event) {
        this.isDropdownOpen = false;
    }
}