import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonInput, IonButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, alertCircleOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { switchMap, finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonInput,
    IonButton,
    IonIcon,
    IonSpinner
  ]
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    identifier: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor() {
    addIcons({ personOutline, lockClosedOutline, alertCircleOutline });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const credentials = this.loginForm.getRawValue();

    this.authService.login(credentials).pipe(
      switchMap(() => this.authService.loadContext()),
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (response: any) => {
        const contextData = response.data ? response.data : response;

        const userGroup = contextData?.group || (contextData?.user?.groups ? contextData.user.groups[0] : 'admin');

        console.log('Ingresando como:', userGroup);

        if (userGroup === 'pas') {
          this.router.navigate(['/pas/inicio'], { replaceUrl: true });
        } else if (userGroup === 'organizador') {
          this.router.navigate(['/organizador/dashboard'], { replaceUrl: true });
        } else {
          this.router.navigate(['/home/dashboard'], { replaceUrl: true });
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage.set('Credenciales incorrectas. Por favor, verifica tus datos.');
        } else {
          this.errorMessage.set('Ocurrió un error inesperado. Intenta nuevamente más tarde.');
        }
      }
    });
  }

  get identifierControl() { return this.loginForm.controls.identifier; }
  get passwordControl() { return this.loginForm.controls.password; }
}