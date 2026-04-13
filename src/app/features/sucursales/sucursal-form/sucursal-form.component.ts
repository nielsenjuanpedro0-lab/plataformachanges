import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SucursalesService } from '../../../core/services/sucursales.service';
import { addIcons } from 'ionicons';
import { closeOutline, chevronDownOutline } from 'ionicons/icons';
// import { Sucursal } from '../../../core/models/sucursal.model'; // Descomentá si lo usás

@Component({
    selector: 'app-sucursal-form',
    templateUrl: './sucursal-form.component.html',
    styleUrls: ['./sucursal-form.component.scss'], // Asegurate de tener esto
    standalone: true,
    imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class SucursalFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private sucursalesService = inject(SucursalesService);
    private modalCtrl = inject(ModalController);

    sucursalId?: number;
    sucursalForm: FormGroup;

    constructor() {
        // Registramos íconos que usa el form
        addIcons({ 'close-outline': closeOutline, 'chevron-down-outline': chevronDownOutline });

        this.sucursalForm = this.fb.group({
            nombre: ['', [Validators.required]],
            codigo: ['', [Validators.required]],
            direccion: ['', [Validators.required]],
            localidad: ['', [Validators.required]], // Agregado
            provincia: ['', [Validators.required]], // Agregado
            codigo_postal: ['', [Validators.required]], // EL CAMPO DE CRISTHIAN
            telefono: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            estado_id: [1, [Validators.required]]
        });
    }

    ngOnInit() {
        if (this.sucursalId) {
            this.loadSucursal();
        }
    }

    loadSucursal() {
        this.sucursalesService.getSucursalById(this.sucursalId!).subscribe({
            next: (sucursal) => this.sucursalForm.patchValue(sucursal)
        });
    }

    onSubmit() {
        if (this.sucursalForm.invalid) return;

        const data = this.sucursalForm.value;
        const request = this.sucursalId
            ? this.sucursalesService.updateSucursal(this.sucursalId, data)
            : this.sucursalesService.createSucursal(data);

        request.subscribe({
            next: () => this.modalCtrl.dismiss(true) // Pasamos true para refrescar la lista
        });
    }

    close() {
        this.modalCtrl.dismiss();
    }
}