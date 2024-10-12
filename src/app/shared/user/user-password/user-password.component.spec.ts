import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserPasswordComponent } from './user-password.component';
import { UserUpdatePasswordService } from './service/user-update-password.service';
import { of, throwError } from 'rxjs';
import { UpdatePasswordUserError } from '../../../constants/ressources/user/userInfoRessource';

describe('UserPasswordComponent', () => {
  let component: UserPasswordComponent;
  let fixture: ComponentFixture<UserPasswordComponent>;
  let updatePasswordService: jest.Mocked<UserUpdatePasswordService>;

  beforeEach(() => {
    updatePasswordService = {
      updatePassword: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, UserPasswordComponent],
      providers: [
        { provide: UserUpdatePasswordService, useValue: updatePasswordService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate passwords match', () => {
    component.updateFormPassword.patchValue({
      new_password: 'password123',
      confirm_new_password: 'password123',
    });
    expect(
      component.passwordsMatchValidator(component.updateFormPassword),
    ).toBe(null);

    component.updateFormPassword.patchValue({
      confirm_new_password: 'differentpassword',
    });
    expect(
      component.passwordsMatchValidator(component.updateFormPassword),
    ).toEqual({ mismatch: true });
  });

  it('should submit form successfully', () => {
    component.updateFormPassword.setValue({
      old_password: 'oldPassword123',
      new_password: 'newPassword123',
      confirm_new_password: 'newPassword123',
    });

    updatePasswordService.updatePassword.mockReturnValue(of({ message: '' }));

    component.onSubmit();

    expect(updatePasswordService.updatePassword).toHaveBeenCalledWith({
      old_password: 'oldPassword123',
      new_password: 'newPassword123',
    });
    expect(component.updateFormPassword.value).toEqual({
      old_password: null,
      new_password: null,
      confirm_new_password: null,
    });
  });
});
