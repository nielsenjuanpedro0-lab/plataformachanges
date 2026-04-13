import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  // Creamos un "Mock" (simulacro) del AuthService para que el test no intente 
  // llamar a la API real de ARGbroker.
  const authServiceMock = {
    login: () => of({ data: { token: 'fake-token' } }),
    loadContext: () => of({ data: {} }),
    currentUser: () => null // Si usás el signal como función
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Como es Standalone, el componente va en imports
      imports: [LoginPage], 
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});