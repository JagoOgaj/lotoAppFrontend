import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  UpdatePasswordAdmin,
  UpdatePasswordAdminError,
} from '../../../constants/ressources/admin/AdminUpdateInfoRessource';
import { AdminPwdService } from './service/admin-pwd.service';
import { CommonModule } from '@angular/common';

/**
 * Composant pour la gestion de la mise à jour du mot de passe administrateur.
 */
@Component({
  selector: 'app-admin-pwd',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-pwd.component.html',
  styleUrl: './admin-pwd.component.css',
})
export class AdminPwdComponent implements OnInit {
  @Output() updateParent: EventEmitter<void> = new EventEmitter<void>();
  updateFormPassword: FormGroup;
  serverErrors: UpdatePasswordAdminError | null = null;

  /**
   * Constructeur du composant.
   *
   * @param fb - FormBuilder pour la création de formulaires réactifs.
   * @param updaPasswordService - Service pour la mise à jour du mot de passe.
   */
  constructor(
    private fb: FormBuilder,
    private updaPasswordService: AdminPwdService,
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
      { validator: this.passwordMatchValidator },
    );
  }

  ngOnInit(): void {}

  /**
   * Validateur personnalisé pour vérifier si le nouveau mot de passe et sa confirmation correspondent.
   *
   * @param form - Le groupe de formulaires à valider.
   * @returns Un objet d'erreur si les mots de passe ne correspondent pas, sinon null.
   */
  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('new_password')?.value;
    const confirmPassword = form.get('confirm_new_password')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  /**
   * Soumet le formulaire de mise à jour du mot de passe.
   * Réinitialise le formulaire et émet un événement parent si la mise à jour réussit.
   */
  onSubmit(): void {
    this.serverErrors = null;
    if (this.updateFormPassword.valid) {
      const formValues = this.updateFormPassword.value;
      const data: UpdatePasswordAdmin = {
        old_password: formValues.old_password,
        new_password: formValues.new_password,
      };

      this.updaPasswordService.updatePasswordAdmin(data).subscribe({
        next: () => {
          this.updateFormPassword.reset();
          this.updateParent.emit();
        },
        error: (err) => {
          this.serverErrors = err;
          this.updateFormPassword.get('old_password')?.setErrors(null);
          this.updateFormPassword.get('new_password')?.setErrors(null);

          if (this.serverErrors?.details) {
            if (this.serverErrors.details.password) {
              this.updateFormPassword.get('old_password')?.setErrors({
                serverError: this.serverErrors.details.password,
              });
            }

            if (this.serverErrors.details.new_password) {
              this.updateFormPassword.get('new_password')?.setErrors({
                serverError: this.serverErrors.details.new_password[0],
              });
            }
          }
        },
      });
    }
  }

  /**
   * Récupère le message d'erreur pour un champ de formulaire spécifique.
   *
   * @param field - Le nom du champ du formulaire.
   * @returns Le message d'erreur correspondant ou null si aucune erreur.
   */
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
