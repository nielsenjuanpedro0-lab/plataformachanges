import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
    addOutline, createOutline, trashOutline, briefcaseOutline,
    mailOutline, callOutline, add, closeOutline, saveOutline,
    warningOutline, chevronDownOutline, searchOutline, locationOutline
} from 'ionicons/icons';

import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
    selector: 'app-pas',
    templateUrl: './pas.page.html',
    styleUrls: ['./pas.page.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule, HeaderComponent]
})
export class PasPage implements OnInit {

    pasList: any[] = [];
    filteredPasList: any[] = [];
    searchTerm: string = '';
    isLoading: boolean = true;

    isModalOpen: boolean = false;
    isDeleteModalOpen: boolean = false;

    pasForm: FormGroup;
    editingId: number | null = null;
    pasToDelete: any = null;

    organizadores = [
        { id: 1, nombre: 'Organizador Litoral' },
        { id: 2, nombre: 'Organizador Sur' }
    ];

    constructor(private fb: FormBuilder) {
        addIcons({
            'add-outline': addOutline, 'create-outline': createOutline, 'trash-outline': trashOutline,
            'briefcase-outline': briefcaseOutline, 'mail-outline': mailOutline,
            'call-outline': callOutline, 'add': add, 'close-outline': closeOutline,
            'save-outline': saveOutline, 'warning-outline': warningOutline,
            'chevron-down-outline': chevronDownOutline, 'search-outline': searchOutline,
            'location-outline': locationOutline
        });

        this.pasForm = this.fb.group({
            nombre_o_razon_social: ['', [Validators.required, Validators.minLength(3)]],
            cuit: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{8}-\d{1}$/)]],
            matricula: ['', [Validators.required]],
            email_contacto: ['', [Validators.required, Validators.email]],
            telefono_contacto: [''],
            domicilio: ['', [Validators.required]],
            organizador_id: [null]
        });
    }

    ngOnInit() {
        setTimeout(() => {
            this.pasList = [
                {
                    id: 1,
                    nombre_o_razon_social: 'Juan Pérez',
                    cuit: '20-30444555-9',
                    matricula: '78544',
                    email_contacto: 'juan.perez@email.com',
                    telefono_contacto: '02262 15-554433',
                    domicilio: 'Calle 123, Necochea',
                    organizador_id: 1
                }
            ];
            this.applyFilters();
            this.isLoading = false;
        }, 800);
    }

    applyFilters() {
        const search = this.searchTerm.toLowerCase().trim();
        this.filteredPasList = this.pasList.filter(p =>
            p.nombre_o_razon_social.toLowerCase().includes(search) ||
            p.matricula.toLowerCase().includes(search) ||
            p.cuit.includes(search)
        );
    }

    nuevoPas() {
        this.editingId = null;
        this.pasForm.reset({ organizador_id: null });
        this.isModalOpen = true;
    }

    editarPas(pas: any) {
        this.editingId = pas.id;
        this.pasForm.patchValue(pas);
        this.isModalOpen = true;
    }

    cerrarModal() { this.isModalOpen = false; }

    guardarPas() {
        if (this.pasForm.invalid) return;
        const formData = this.pasForm.value;

        if (this.editingId) {
            const index = this.pasList.findIndex(p => p.id === this.editingId);
            if (index !== -1) {
                this.pasList[index] = { ...this.pasList[index], ...formData };
            }
        } else {
            const newId = Math.max(...this.pasList.map(p => p.id), 0) + 1;
            this.pasList.push({ id: newId, ...formData });
        }
        this.applyFilters();
        this.cerrarModal();
    }

    abrirEliminar(pas: any) {
        this.pasToDelete = pas;
        this.isDeleteModalOpen = true;
    }

    cerrarEliminar() {
        this.isDeleteModalOpen = false;
        setTimeout(() => this.pasToDelete = null, 300);
    }

    confirmarEliminacion() {
        if (this.pasToDelete) {
            this.pasList = this.pasList.filter(p => p.id !== this.pasToDelete.id);
            this.applyFilters();
        }
        this.cerrarEliminar();
    }
}