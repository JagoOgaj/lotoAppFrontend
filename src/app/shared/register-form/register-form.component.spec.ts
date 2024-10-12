import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './register-form.component';
import { UserRegistryService } from './service/user-registry.service';
import { AuthService } from '../../core/service/auth.service';
import { of, throwError } from 'rxjs';
import {
  RegistryData,
  RegistryErrors,
} from '../../constants/ressources/user/registryUserRessource';
import { Router } from '@angular/router';

class MockUserRegistryService {
  registry = jest.fn().mockReturnValue(
    of({
      access_token: 'fakeAccessToken',
      refresh_token: 'fakeRefreshToken',
    }),
  );
}

class MockAuthService {
  setTokens = jest.fn();
}

class MockRouter {
  navigate = jest.fn();
}

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userRegistryService: UserRegistryService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegisterFormComponent],
      providers: [
        { provide: UserRegistryService, useClass: MockUserRegistryService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    userRegistryService = TestBed.inject(UserRegistryService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should handle server errors during registration', () => {
    const mockError: RegistryErrors = {
      errors: true,
      message: 'Error during registration',
    };

    jest
      .spyOn(userRegistryService, 'registry')
      .mockReturnValue(throwError(mockError));
    component.registryForm.patchValue({
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(component.serverErrors).toEqual(mockError);
  });

  it('should emit tab change event', () => {
    const emitSpy = jest.spyOn(component.tabChange, 'emit');
    component.onTabChange();
    expect(emitSpy).toHaveBeenCalledWith('login');
  });
});
