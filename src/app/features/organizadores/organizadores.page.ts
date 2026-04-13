import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  addOutline, trashOutline, businessOutline, personOutline,
  shieldOutline, add, closeOutline, saveOutline, warningOutline,
  chevronDownOutline, checkmark, peopleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-sucursales-ejecutivos',
  templateUrl: './sucursales-ejecutivos.page.html',
  styleUrls: ['./sucursales-ejecutivos.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class SucursalesEjecutivosPage implements OnInit {

  asignaciones: any[] = [];
  isLoading: boolean = true;
  isModalOpen: boolean = false;
  asignacionForm: FormGroup;
  isDropdownOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  itemToDelete: any = null;

  // Datos para los selectores (Vendrían de 02 · CATÁLOGOS y 05 · SUCURSALES)
  sucursales = [{ id: 1, nombre: 'Sucursal Centro' }, { id: 2, nombre: 'Sucursal Necochea' }];
  usuariosInternos = [{ id: 5, nombre: 'Juan Pérez' }, { id: 8, nombre: 'María López' }];
  tiposEjecutivo = [{ id: 1, nombre: 'Ejecutivo de Cuenta' }, { id: 2, nombre: 'Ejecutivo de Siniestros' }];

  constructor(private fb: FormBuilder) {
    addIcons({
      addOutline, trashOutline, businessOutline, personOutline,
      shieldOutline, add, closeOutline, saveOutline, warningOutline,
      chevronDownOutline, checkmark, peopleOutline
    });

    this.asignacionForm = this.fb.group({
      sucursal_id: [null, Validators.required],
      user_id: [null, Validators.required],
      tipo_ejecutivo_id: [null, Validators.required],
      estado_id: [1, Validators.required]
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.asignaciones = [
        {
          id: 1,
          sucursal: { nombre: 'Sucursal Centro' },
          ejecutivo: { nombre: 'Juan', apellido: 'Pérez' },
          tipo_ejecutivo: { nombre: 'Ejecutivo de Cuenta' },
          estado_id: 1
        }
      ];
      this.isLoading = false;
    }, 800);
  }

  nuevaAsignacion() {
    this.asignacionForm.reset({ estado_id: 1 });
    this.isModalOpen = true;
  }

  cerrarModal() { this.isModalOpen = false; this.isDropdownOpen = false; }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectEstado(value: number) {
    this.asignacionForm.patchValue({ estado_id: value });
    this.isDropdownOpen = false;
  }

  getEstadoLabel() {
    return this.asignacionForm.get('estado_id')?.value === 1 ? 'Activo' : 'Inactivo';
  }

  abrirEliminar(item: any) { this.itemToDelete = item; this.isDeleteModalOpen = true; }
  cerrarEliminar() { this.isDeleteModalOpen = false; }
}