import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminPwdComponent } from './admin-pwd.component';
import { AdminPwdService } from './service/admin-pwd.service';
import { of, throwError } from 'rxjs';
import {
  UpdatePasswordAdmin,
  UpdatePasswordAdminError,
} from '../../../constants/ressources/admin/AdminUpdateInfoRessource';

describe('AdminPwdComponent', () => {
  let component: AdminPwdComponent;
  let fixture: ComponentFixture<AdminPwdComponent>;
  let adminPwdService: jest.Mocked<AdminPwdService>;

  beforeEach(async () => {
    adminPwdService = {
      updatePasswordAdmin: jest.fn(),
    } as unknown as jest.Mocked<AdminPwdService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AdminPwdComponent],
      providers: [{ provide: AdminPwdService, useValue: adminPwdService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.updateFormPassword).toBeDefined();
    expect(component.updateFormPassword.valid).toBeFalsy();
  });

  it('should call updatePasswordAdmin and emit updateParent on successful submission', () => {
    const formValues: UpdatePasswordAdmin = {
      old_password: 'oldPassword123',
      new_password: 'newPassword123',
    };

    component.updateFormPassword.setValue({
      old_password: formValues.old_password,
      new_password: formValues.new_password,
      confirm_new_password: 'newPassword123',
    });

    adminPwdService.updatePasswordAdmin.mockReturnValue(
      of({ message: 'Mot de passe mis à jour avec succès' }),
    );

    const emitSpy = jest.spyOn(component.updateParent, 'emit');

    component.onSubmit();

    expect(adminPwdService.updatePasswordAdmin).toHaveBeenCalledWith({
      old_password: formValues.old_password,
      new_password: formValues.new_password,
    });
    expect(emitSpy).toHaveBeenCalled();
    expect(component.updateFormPassword.value).toEqual({
      old_password: null,
      new_password: null,
      confirm_new_password: null,
    });
  });

  it('should set server errors on submission failure', () => {
    const formValues: UpdatePasswordAdmin = {
      old_password: 'oldPassword123',
      new_password: 'newPassword123',
    };

    component.updateFormPassword.setValue({
      old_password: formValues.old_password,
      new_password: formValues.new_password,
      confirm_new_password: 'newPassword123',
    });

    const errorResponse: UpdatePasswordAdminError = {
      errors: true,
      message: 'Erreur de mise à jour',
      details: {
        password: ['Mot de passe incorrect'],
        new_password: ['Le mot de passe est trop court'],
      },
    };

    adminPwdService.updatePasswordAdmin.mockReturnValue(
      throwError(() => errorResponse),
    );

    component.onSubmit();

    expect(adminPwdService.updatePasswordAdmin).toHaveBeenCalledWith({
      old_password: formValues.old_password,
      new_password: formValues.new_password,
    });
    expect(component.serverErrors).toEqual(errorResponse);
    expect(component.updateFormPassword.get('old_password')?.errors).toEqual({
      serverError: ['Mot de passe incorrect'],
    });
    expect(component.updateFormPassword.get('new_password')?.errors).toEqual({
      serverError: 'Le mot de passe est trop court',
    });
  });

  it('should return appropriate error messages', () => {
    const control = component.updateFormPassword.get('old_password');
    control?.setErrors({ required: true });
    expect(component.getErrorMessage('old_password')).toBe(
      'Ce champ est obligatoire',
    );

    control?.setErrors({ minlength: { requiredLength: 8, actualLength: 5 } });
    expect(component.getErrorMessage('old_password')).toBe(
      'Le mot de passe doit contenir au moins 8 caractères',
    );

    component.updateFormPassword.setErrors({ mismatch: true });
    expect(component.getErrorMessage('new_password')).toBe(
      'Ce champ est obligatoire',
    );

    control?.setErrors({ serverError: 'Erreur serveur' });
    expect(component.getErrorMessage('old_password')).toBe('Erreur serveur');
  });
});
