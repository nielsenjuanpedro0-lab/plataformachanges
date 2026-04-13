import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  personOutline, mailOutline, businessOutline,
  createOutline, trashOutline, addOutline, searchOutline,
  chevronDownOutline, closeOutline, shieldCheckmarkOutline, filterOutline, warningOutline, add
} from 'ionicons/icons';

import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent
  ]
})
export class UsuariosPage implements OnInit {

  users: any[] = [];
  isLoading: boolean = true;

  isModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;

  userForm: FormGroup;
  editingId: number | null = null;
  userToDelete: any = null;

  // Filtros
  searchTerm: string = '';
  filterRole: string = 'todos';

  constructor(private fb: FormBuilder) {
    addIcons({
      'person-outline': personOutline, 'mail-outline': mailOutline, 'business-outline': businessOutline,
      'create-outline': createOutline, 'trash-outline': trashOutline, 'add-outline': addOutline,
      'search-outline': searchOutline, 'filter-outline': filterOutline, 'chevron-down-outline': chevronDownOutline,
      'close-outline': closeOutline, 'shield-checkmark-outline': shieldCheckmarkOutline, 'warning-outline': warningOutline,
      'add': add
    });

    this.userForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required]],
      numeroProductor: [''],
      rol: ['Comercial', [Validators.required]],
      sucursal: ['', [Validators.required]],
      activo: [true]
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.users = [
        { id: 1, nombre: 'Juan Pedro Nielsen', rol: 'Super Admin', email: 'juan@ascia.com', dni: '45123456', numeroProductor: '00000', sucursal: 'Necochea', activo: true },
        { id: 2, nombre: 'Cristhian Backend', rol: 'Developer', email: 'cris@ascia.com', dni: '39876543', numeroProductor: 'DEV01', sucursal: 'Mar del Plata', activo: true },
        { id: 3, nombre: 'Ejecutivo de Prueba', rol: 'Comercial', email: 'test@argbroker.com', dni: '25444333', numeroProductor: 'PAS982', sucursal: 'Buenos Aires', activo: false }
      ];
      this.isLoading = false;
    }, 800);
  }

  get filteredUsers() {
    return this.users.filter(user => {
      const term = this.searchTerm.toLowerCase();
      const matchesSearch = (
        user.nombre.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.dni.includes(term) ||
        user.numeroProductor.toLowerCase().includes(term)
      );
      const matchesRole = this.filterRole === 'todos' || user.rol === this.filterRole;
      return matchesSearch && matchesRole;
    });
  }

  nuevoUsuario() {
    this.editingId = null;
    this.userForm.reset({ activo: true, rol: 'Comercial' });
    this.isModalOpen = true;
  }

  editarUsuario(user: any) {
    this.editingId = user.id;
    this.userForm.patchValue(user);
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
  }

  guardarUsuario() {
    if (this.userForm.invalid) return;

    const formData = this.userForm.value;

    if (this.editingId) {
      const index = this.users.findIndex(u => u.id === this.editingId);
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...formData };
      }
    } else {
      const newId = Math.max(...this.users.map(u => u.id), 0) + 1;
      this.users.push({ id: newId, ...formData });
    }

    this.cerrarModal();
  }

  abrirEliminar(user: any) {
    this.userToDelete = user;
    this.isDeleteModalOpen = true;
  }

  cerrarEliminar() {
    this.isDeleteModalOpen = false;
    setTimeout(() => this.userToDelete = null, 300);
  }

  confirmarEliminacion() {
    if (this.userToDelete) {
      this.users = this.users.filter(u => u.id !== this.userToDelete.id);
    }
    this.cerrarEliminar();
  }
}