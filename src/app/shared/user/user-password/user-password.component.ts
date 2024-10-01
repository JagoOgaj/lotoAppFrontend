import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  UpdatePasswordUser,
  UpdatePasswordUserError,
} from '../../../constants/ressources/user/userInfoRessource';
import { UserUpdatePasswordService } from './service/user-update-password.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css'],
})
export class UserPasswordComponent implements OnInit {
  updateFormPassword: FormGroup;
  serverErrors: UpdatePasswordUserError | null = null;

  constructor(
    private fb: FormBuilder,
    private updatePasswordService: UserUpdatePasswordService,
  ) {
    this.updateFormPassword = this.fb.group(
      {
        old_password: ['', [Validators.required, Validators.minLength(8)]],
        new_password: ['', [Validators.required, Validators.minLength(8)]],
        confirm_new_password: [
          '',
          [Validators.required, Validators.minLength(8)],
        ],
      },
      { validator: this.passwordsMatchValidator },
    );
  }

  ngOnInit(): void {}

  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('new_password')?.value;
    const confirmPassword = form.get('confirm_new_password')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.serverErrors = null;
    if (this.updateFormPassword.valid) {
      const formValues = this.updateFormPassword.value;
      const data: UpdatePasswordUser = {
        old_password: formValues.old_password,
        new_password: formValues.new_password,
      };

      this.updatePasswordService.updatePassword(data).subscribe({
        next: () => {
          this.updateFormPassword.reset();
        },
        error: (err) => {
          this.serverErrors = err;
          this.updateFormPassword.get('old_password')?.setErrors(null);
          this.updateFormPassword.get('new_password')?.setErrors(null);

          if (this.serverErrors?.details) {
            if (this.serverErrors.details.password) {
              this.updateFormPassword
                .get('old_password')
                ?.setErrors({
                  serverError: this.serverErrors.details.password,
                });
            }

            if (this.serverErrors.details.new_password) {
              this.updateFormPassword
                .get('new_password')
                ?.setErrors({
                  serverError: this.serverErrors.details.new_password[0],
                });
            }
          }
        },
      });
    }
  }

  getErrorMessage(field: string): string | null {
    const control = this.updateFormPassword.get(field);

    if (control?.errors?.['required']) {
      return 'Ce champ est obligatoire';
    } else if (control?.errors?.['minlength']) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (control?.errors?.['mismatch']) {
      return 'Les mots de passe ne correspondent pas';
    }

    if (control?.errors?.['serverError']) {
      return control.errors['serverError'];
    }

    return null;
  }
}
