import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { AreasService } from 'src/app/core/services/areas.service';
import { SucursalesService } from 'src/app/core/services/sucursales.service';
import { TiposEjecutivoService } from 'src/app/core/services/tipos-ejecutivo.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.page.html',
  styleUrls: ['./usuario-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class UsuarioFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  private navParams = inject(NavParams);

  private usuariosService = inject(UsuariosService);
  private areasService = inject(AreasService);
  private sucursalesService = inject(SucursalesService);
  private tiposService = inject(TiposEjecutivoService);

  userForm: FormGroup;
  usuarioId: number | undefined;

  // Signals para la interfaz
  isLoading = signal(false);
  areas = signal<any[]>([]);
  sucursales = signal<any[]>([]);

  // Cambiamos 'tipos' por 'grupos' para que tu HTML no tire error
  grupos = signal<any[]>([]);

  constructor() {
    this.usuarioId = this.navParams.get('usuarioId');
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', this.usuarioId ? [] : [Validators.required]],
      sucursal_id: [null, [Validators.required]],
      area_empresa_id: [null, [Validators.required]],
      tipo_ejecutivo_id: [null, [Validators.required]],
      estado_id: [1, [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.isLoading.set(true);
    forkJoin({
      areas: this.areasService.getAreas(),
      sucursales: this.sucursalesService.getSucursales(),
      tipos: this.tiposService.getTipos()
    }).subscribe({
      next: (res) => {
        this.areas.set(res.areas.areas);
        this.sucursales.set(res.sucursales.sucursales);

        // Mapeamos los tipos a 'grupos' con el formato que espera tu select
        const mapeado = res.tipos.tipos.map((t: any) => ({
          value: t.id,
          label: t.nombre
        }));
        this.grupos.set(mapeado);

        if (this.usuarioId) this.loadUsuario();
        else this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  loadUsuario() {
    this.usuariosService.getUsuarioById(this.usuarioId!).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  // Esta es la función que te faltaba
  goBack() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    this.isLoading.set(true);
    const obs = this.usuarioId
      ? this.usuariosService.updateUsuario(this.usuarioId, this.userForm.value)
      : this.usuariosService.createUsuario(this.userForm.value);

    obs.subscribe({
      next: () => {
        this.isLoading.set(false);
        this.modalCtrl.dismiss(true);
      },
      error: () => this.isLoading.set(false)
    });
  }
}