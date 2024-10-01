import { Component, Input, SimpleChanges } from '@angular/core';
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

@Component({
  selector: 'app-admin-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-info.component.html',
  styleUrl: './admin-info.component.css',
})
export class AdminInfoComponent {
  @Input() adminInfo!: AdminInfoResponse;
  adminFormInfo: FormGroup;
  isFormChange: boolean = false;
  errorResponse: UpdateInfoAdminResponseError | null = {
    errors: false,
    message: '',
    details: {},
  };

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

  ngOnInit(): void {
    if (this.adminInfo) {
      this.patchadminInfo();
    }

    this.adminFormInfo.valueChanges.subscribe(() => {
      this.checkIfFormIsChanged();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminInfo'] && changes['adminInfo'].currentValue) {
      this.patchadminInfo();
    }
  }

  patchadminInfo(): void {
    const patchedValues = {
      ...this.adminInfo,
    };
    this.adminFormInfo.patchValue(patchedValues);
    this.isFormChange = false;
  }

  checkIfFormIsChanged(): void {
    const currentValue = this.adminFormInfo.value;

    this.isFormChange =
      currentValue.first_name !== this.adminInfo.first_name ||
      currentValue.last_name !== this.adminInfo.last_name ||
      currentValue.email !== this.adminInfo.email;
  }

  onSubmit(): void {
    if (this.adminFormInfo.valid) {
      const updatedFields = this.getUpdatedFields();
      this.updateService.updateAdminInfo(updatedFields).subscribe({
        next: (response) => {
          this.errorResponse = null;
          this.isFormChange = false;
        },
        error: (error: UpdatePasswordUAdminError) => {
          this.errorResponse = error;
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

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
