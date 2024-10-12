import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AdminLoginComponent } from './admin-login.component';
import { AdminLoginService } from './service/admin-login.service';
import { AuthService } from '../../../core/service/auth.service';
import { LoginAdminResponse } from '../../../constants/ressources/admin/AdminLoginRessource';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;
  let mockAdminLoginService: jest.Mocked<AdminLoginService>;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    mockAdminLoginService = {
      loginAdmin: jest.fn(),
    } as any;
    mockAuthService = {
      setTokens: jest.fn(),
      setUserRole: jest.fn(),
    } as any;
    mockRouter = {
      navigate: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AdminLoginComponent],
      providers: [
        { provide: AdminLoginService, useValue: mockAdminLoginService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm with email and password controls', () => {
    expect(component.loginForm.contains('email')).toBe(true);
    expect(component.loginForm.contains('password')).toBe(true);
  });

  it('should set serverErrors to null on form submit', () => {
    component.onSubmit();
    expect(component.serverErrors).toBeNull();
  });

  it('should call loginAdmin and navigate to admin on successful login', () => {
    const mockResponse: LoginAdminResponse = {
      message: 'Connexion réussie',
      access_token: 'mockAccessToken',
      refresh_token: 'mockRefreshToken',
    };

    mockAdminLoginService.loginAdmin.mockReturnValue(of(mockResponse));
    jest.spyOn(component.loginForm, 'reset');

    component.loginForm.setValue({
      email: 'admin@example.com',
      password: 'password123',
    });
    component.onSubmit();

    expect(mockAdminLoginService.loginAdmin).toHaveBeenCalled();
    expect(mockAuthService.setTokens).toHaveBeenCalledWith(
      'mockAccessToken',
      'mockRefreshToken',
    );
    expect(mockAuthService.setUserRole).toHaveBeenCalled();
    expect(component.loginForm.reset).toHaveBeenCalled();
  });

  it('should set serverErrors on login failure', () => {
    const mockError = { errors: true, message: 'Erreur de connexion' };
    mockAdminLoginService.loginAdmin.mockReturnValue(
      throwError(() => mockError),
    );
    jest.spyOn(component.loginForm, 'reset');

    component.loginForm.setValue({
      email: 'admin@example.com',
      password: 'password123',
    });
    component.onSubmit();

    expect(component.serverErrors).toEqual(mockError);
    expect(component.loginForm.reset).toHaveBeenCalled();
  });

  it('should navigate to home', () => {
    component.goToHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});
