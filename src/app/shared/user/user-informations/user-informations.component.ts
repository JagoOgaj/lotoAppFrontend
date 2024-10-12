import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  UpdateInfoUserResponseError,
  UserInfoRessource,
} from '../../../constants/ressources/user/userInfoRessource';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserUpdateService } from './service/user-update.service';
import { CommonModule } from '@angular/common';

/**
 * Composant pour afficher et mettre à jour les informations de l'utilisateur.
 */
@Component({
  selector: 'app-user-informations',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-informations.component.html',
  styleUrls: ['./user-informations.component.css'],
})
export class UserInformationsComponent implements OnInit {
  @Input() userInfo!: UserInfoRessource;
  userFormInfo: FormGroup;
  isFormChange: boolean = false;
  errorResponse: UpdateInfoUserResponseError | null = {
    errors: false,
    message: '',
    details: {},
  };

  /**
   * Constructeur du composant UserInformationsComponent.
   *
   * @param fb - FormBuilder pour créer des formulaires réactifs.
   * @param updateService - Service pour mettre à jour les informations de l'utilisateur.
   */
  constructor(
    private fb: FormBuilder,
    private updateService: UserUpdateService,
  ) {
    this.userFormInfo = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      notification: [false],
    });
  }

  /**
   * Méthode appelée lors de l'initialisation du composant.
   */
  ngOnInit(): void {
    if (this.userInfo) {
      this.patchUserInfo();
    }

    this.userFormInfo.valueChanges.subscribe(() => {
      this.checkIfFormIsChanged();
    });
  }

  /**
   * Méthode appelée lorsque les entrées du composant changent.
   *
   * @param changes - Changements des propriétés d'entrée.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInfo'] && changes['userInfo'].currentValue) {
      this.patchUserInfo();
    }
  }

  /**
   * Remplit le formulaire avec les informations de l'utilisateur.
   */
  patchUserInfo(): void {
    const patchedValues = {
      ...this.userInfo,
      notification: this.userInfo.notification === true,
    };
    this.userFormInfo.patchValue(patchedValues);
    this.isFormChange = false;
  }

  /**
   * Vérifie si le formulaire a été modifié par rapport aux données d'origine.
   */
  checkIfFormIsChanged(): void {
    const currentValue = this.userFormInfo.value;
    const currentNotification = currentValue.notification === 'true';
    const originalNotification = this.userInfo.notification === true;

    this.isFormChange =
      currentValue.first_name !== this.userInfo.first_name ||
      currentValue.last_name !== this.userInfo.last_name ||
      currentValue.email !== this.userInfo.email ||
      currentNotification !== originalNotification;
  }

  /**
   * Soumet le formulaire pour mettre à jour les informations de l'utilisateur.
   */
  onSubmit(): void {
    if (this.userFormInfo.valid) {
      const updatedFields = this.getUpdatedFields();
      this.updateService.updateInfo(updatedFields).subscribe({
        next: (response) => {
          this.errorResponse = null;
          this.isFormChange = false;
        },
        error: (error: UpdateInfoUserResponseError) => {
          this.errorResponse = error;
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  /**
   * Récupère les champs mis à jour pour la soumission.
   *
   * @returns {Partial<UserInfoRessource>} - Les champs mis à jour.
   */
  getUpdatedFields(): Partial<UserInfoRessource> {
    const updatedFields: Partial<UserInfoRessource> = {};
    const currentValue = this.userFormInfo.value;

    if (currentValue.first_name !== this.userInfo.first_name) {
      updatedFields.first_name = currentValue.first_name;
    }
    if (currentValue.last_name !== this.userInfo.last_name) {
      updatedFields.last_name = currentValue.last_name;
    }
    if (currentValue.email !== this.userInfo.email) {
      updatedFields.email = currentValue.email;
    }
    const currentNotification = currentValue.notification === 'true';
    const originalNotification = this.userInfo.notification === true;
    if (currentNotification !== originalNotification) {
      updatedFields.notification = currentValue.notification;
    }

    return updatedFields;
  }
}
