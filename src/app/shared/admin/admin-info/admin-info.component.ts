import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AdminInfoResponse } from '../../../constants/ressources/admin/AdminInfoRessource';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  UpdateInfoAdmin,
  UpdateInfoAdminResponseError,
  UpdatePasswordUAdminError,
} from '../../../constants/ressources/admin/AdminUpdateInfoRessource';
import { AdminInfoService } from './service/admin-info.service';
import { CommonModule } from '@angular/common';

/**
 * Composant pour afficher et mettre à jour les informations administratives.
 */
@Component({
  selector: 'app-admin-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-info.component.html',
  styleUrl: './admin-info.component.css',
})
export class AdminInfoComponent {
  @Input() adminInfo!: AdminInfoResponse;
  @Output() updateParent: EventEmitter<void> = new EventEmitter<void>();
  adminFormInfo: FormGroup;
  isFormChange: boolean = false;
  errorResponse: UpdateInfoAdminResponseError | null = {
    errors: false,
    message: '',
    details: {},
  };

  /**
   * Constructeur du composant.
   *
   * @param {FormBuilder} fb - Le constructeur de formulaires pour créer des groupes de formulaires.
   * @param {AdminInfoService} updateService - Service pour mettre à jour les informations administratives.
   */
  constructor(
    private fb: FormBuilder,
    private updateService: AdminInfoService,
  ) {
    this.adminFormInfo = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Méthode appelée lors de l'initialisation du composant.
   * Patch les valeurs administratives si elles existent et écoute les changements de valeur.
   */
  ngOnInit(): void {
    if (this.adminInfo) {
      this.patchadminInfo();
    }

    this.adminFormInfo.valueChanges.subscribe(() => {
      this.checkIfFormIsChanged();
    });
  }

  /**
   * Méthode appelée lors des changements d'input.
   *
   * @param {SimpleChanges} changes - Les changements détectés dans les inputs.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminInfo'] && changes['adminInfo'].currentValue) {
      this.patchadminInfo();
    }
  }

  /**
   * Met à jour les valeurs du formulaire avec les informations administratives existantes.
   */
  patchadminInfo(): void {
    const patchedValues = {
      ...this.adminInfo,
    };
    this.adminFormInfo.patchValue(patchedValues);
    this.isFormChange = false;
  }

  /**
   * Vérifie si le formulaire a été modifié par rapport aux valeurs d'entrée.
   */
  checkIfFormIsChanged(): void {
    const currentValue = this.adminFormInfo.value;

    this.isFormChange =
      currentValue.first_name !== this.adminInfo.first_name ||
      currentValue.last_name !== this.adminInfo.last_name ||
      currentValue.email !== this.adminInfo.email;
  }

  /**
   * Soumet le formulaire si celui-ci est valide et met à jour les informations administratives.
   */
  onSubmit(): void {
    if (this.adminFormInfo.valid) {
      const updatedFields = this.getUpdatedFields();
      this.updateService.updateAdminInfo(updatedFields).subscribe({
        next: (response) => {
          this.errorResponse = null;
          this.isFormChange = false;
          this.updateParent.emit();
        },
        error: (error: UpdatePasswordUAdminError) => {
          this.errorResponse = error;
        },
      });
    }
  }

  /**
   * Récupère les champs mis à jour à partir du formulaire.
   *
   * @returns {Partial<UpdateInfoAdmin>} - Les champs mis à jour.
   */
  getUpdatedFields(): Partial<UpdateInfoAdmin> {
    const updatedFields: Partial<UpdateInfoAdmin> = {};
    const currentValue = this.adminFormInfo.value;

    if (currentValue.first_name !== this.adminInfo.first_name) {
      updatedFields.first_name = currentValue.first_name;
    }
    if (currentValue.last_name !== this.adminInfo.last_name) {
      updatedFields.last_name = currentValue.last_name;
    }
    if (currentValue.email !== this.adminInfo.email) {
      updatedFields.email = currentValue.email;
    }
    return updatedFields;
  }
}
