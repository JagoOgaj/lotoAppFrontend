import { Component, Input, OnInit } from '@angular/core';
import {
  LotteryRegistryData,
  LotteryRegistryError,
} from '../../constants/ressources/user/LotteryRegistryRessource';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LottoryFormService } from './service/lottory-form.service';
import { CommonModule } from '@angular/common';
import { UserPlayServiceService } from '../user/user-play/service/user-play-service.service';
import { UserSharedService } from '../user/service/user-shared.service';

@Component({
  selector: 'app-lottory-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './lottory-form.component.html',
  styleUrl: './lottory-form.component.css',
})
export class LottoryFormComponent implements OnInit {
  @Input() idTirrage!: number;
  registryLotteryForm: FormGroup;
  backendErrors: LotteryRegistryError | null = null;

  constructor(
    private fb: FormBuilder,
    private registryLotteryService: LottoryFormService,
    private userPlayService: UserPlayServiceService,
    private userSharedService: UserSharedService,
  ) {
    this.registryLotteryForm = this.fb.group({
      numbers: this.fb.group({
        num1: [
          null,
          [Validators.required, Validators.min(1), Validators.max(50)],
        ],
        num2: [
          null,
          [Validators.required, Validators.min(1), Validators.max(50)],
        ],
        num3: [
          null,
          [Validators.required, Validators.min(1), Validators.max(50)],
        ],
        num4: [
          null,
          [Validators.required, Validators.min(1), Validators.max(50)],
        ],
        num5: [
          null,
          [Validators.required, Validators.min(1), Validators.max(50)],
        ],
      }),
      lucky_numbers: this.fb.group({
        lucky1: [
          null,
          [Validators.required, Validators.min(1), Validators.max(10)],
        ],
        lucky2: [
          null,
          [Validators.required, Validators.min(1), Validators.max(10)],
        ],
      }),
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    const formValues = this.registryLotteryForm.value;
    const dataToSubmit: LotteryRegistryData = {
      lottery_id: this.idTirrage,
      numbers: `${formValues.numbers.num1},${formValues.numbers.num2},${formValues.numbers.num3},${formValues.numbers.num4},${formValues.numbers.num5}`,
      lucky_numbers: `${formValues.lucky_numbers.lucky1},${formValues.lucky_numbers.lucky2}`,
    };
    this.registryLotteryService.registryToLottery(dataToSubmit).subscribe({
      next: (response) => {
        this.userSharedService.notifyLotteryUpdate();
        this.backendErrors = null;
      },
      error: (error) => {
        this.handleBackendErrors(error);
      },
    });
  }

  handleBackendErrors(errorResponse: LotteryRegistryError) {
    this.backendErrors = errorResponse;

    Object.keys(this.registryLotteryForm.controls).forEach((key) => {
      this.registryLotteryForm.get(key)?.setErrors(null);
    });

    if (errorResponse.details?.numbers) {
      this.registryLotteryForm
        .get('numbers')
        ?.setErrors({ backend: errorResponse.details.numbers.join(', ') });
    }
    if (errorResponse.details?.lucky_numbers) {
      this.registryLotteryForm.get('lucky_numbers')?.setErrors({
        backend: errorResponse.details.lucky_numbers.join(', '),
      });
    }
  }

  get isSubmitDisabled(): boolean {
    return this.registryLotteryForm.invalid;
  }
}
