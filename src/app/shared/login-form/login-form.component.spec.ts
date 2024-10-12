import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginFormComponent } from './login-form.component';
import { UserLoginService } from './service/user-login.service';
import { AuthService } from '../../core/service/auth.service';
import { of } from 'rxjs';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let loginService: UserLoginService;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const loginServiceMock = {
      login: jest.fn(),
    };

    const authServiceMock = {
      setTokens: jest.fn(),
      setUserRole: jest.fn().mockReturnValue(of(null)),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginFormComponent],
      providers: [
        { provide: UserLoginService, useValue: loginServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(UserLoginService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the login form successfully', () => {
    const mockResponse = {
      access_token: 'token123',
      refresh_token: 'refreshToken123',
    };
    loginService.login = jest.fn().mockReturnValue(of(mockResponse));

    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.onSubmit();

    expect(loginService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(authService.setTokens).toHaveBeenCalledWith(
      'token123',
      'refreshToken123',
    );
    expect(router.navigate).toHaveBeenCalledWith(['/account']);
    expect(component.loginForm.value).toEqual({ email: null, password: null });
  });

  it('should emit tabChange event when calling onTabChange', () => {
    jest.spyOn(component.tabChange, 'emit');

    component.onTabChange();

    expect(component.tabChange.emit).toHaveBeenCalledWith('registry');
  });
});
