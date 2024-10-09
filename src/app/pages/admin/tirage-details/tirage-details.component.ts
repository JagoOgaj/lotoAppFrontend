import { CommonModule } from '@angular/common';
import {
  AfterContentChecked,
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AddWiningsNumber,
  UpdateLotteryError,
} from '../../../constants/ressources/admin/AdminUpdateLottery';
import { LotteryOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import {
  StatusOptions,
  TirageStatus,
} from '../../../constants/tirageStatus/tirageStatus.constants';
import { AdminSharedService } from '../service/admin-shared.service';

@Component({
  selector: 'app-tirage-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tirage-details.component.html',
  styleUrl: './tirage-details.component.css',
})
export class TirageDetailsComponent implements OnInit, AfterContentChecked {
  private activatedRoute = inject(ActivatedRoute);
  tirageOverview: LotteryOverviewResponse | null = null;
  tirageId: number | null = null;
  updateTirageForm!: FormGroup;
  winningNumbersForm: FormGroup;
  showWinningForm: boolean = false;
  serverErrors: UpdateLotteryError | null = {
    errors: true,
    message: '',
    details: {},
  };
  hasErros: boolean = false;
  formChanged: boolean = false;
  readonly statusOptions: StatusOptions = [
    { value: TirageStatus.EN_COUR, label: 'En cours' },
    { value: TirageStatus.EN_VALIDATION, label: 'En validation' },
    { value: TirageStatus.TERMINE, label: 'Terminé' },
    { value: TirageStatus.SIMULATION_TERMINE, label: 'Simulation terminé' },
  ];
  disabledEndTirage: boolean = true;
  disabledConfirmEndTirage: boolean = true;
  modalColapsed: boolean = false;

  constructor(
    private tirageAdminService: AdminSharedService,
    private fb: FormBuilder,
    private route: Router,
  ) {
    this.updateTirageForm = this.fb.group({
      name: [''],
      reward_price: [''],
      max_participants: [''],
      status: [''],
      start_date: [''],
      end_date: [''],
    });
    this.winningNumbersForm = this.fb.group({
      winningNumbers: [
        '',
        [
          Validators.required,
          Validators.pattern(/^((([1-9]|[1-3][0-9]|4[0-9]),?){5})$/),
        ],
      ],
      bonusNumbers: [
        '',
        [Validators.required, Validators.pattern(/^(([1-9]),?){1,2}$/)],
      ],
    });
  }

  ngOnInit(): void {
    const idNullable = this.activatedRoute.snapshot.paramMap.get('id');
    if (idNullable) {
      this.tirageId = +idNullable;
      this.loadTirageDetails(this.tirageId);
    }
  }

  ngAfterContentChecked(): void {
    this.updateTirageForm.valueChanges.subscribe(() => {
      this.serverErrors = null;
      this.hasErros = false;
      this.checkIfFormIsChanged();
    });
  }

  initForm(tirageDetail: LotteryOverviewResponse): void {
    this.updateTirageForm = this.fb.group({
      name: [tirageDetail.name, [Validators.required, Validators.minLength(2)]],
      reward_price: [
        tirageDetail.reward_price,
        [Validators.required, Validators.min(1), this.integerValidator],
      ],
      max_participants: [
        tirageDetail.max_participants,
        [Validators.required, Validators.min(1), this.integerValidator],
      ],
      status: [tirageDetail.status, [Validators.required]],
      start_date: [tirageDetail.start_date, [Validators.required]],
      end_date: [tirageDetail.end_date, [Validators.required]],
    });
  }

  loadTirageDetails(id: number): void {
    this.tirageAdminService.getTirageDetails(id).subscribe({
      next: (data) => {
        this.disabledEndTirage = !(
          data.data.status == TirageStatus.EN_VALIDATION ||
          data.data.status == TirageStatus.SIMULATION
        );
        this.disabledConfirmEndTirage = !(data.data.participant_count > 0);
        this.tirageOverview = {
          ...data.data,
          start_date: this.adjustDate(data.data.start_date),
          end_date: this.adjustDate(data.data.end_date),
        };
        this.initForm(this.tirageOverview);
      },
      error: (err) => {},
    });
  }

  showWinningNumbersForm(show: boolean): void {
    this.showWinningForm = show;
  }

  adjustDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }

  modalColapse(): void {
    this.modalColapsed = !this.modalColapsed;
  }

  getStatusOptions() {
    const currentStatus = this.tirageOverview?.status;
    switch (currentStatus) {
      case TirageStatus.EN_COUR:
        return this.statusOptions.filter(
          (option) =>
            option.value === TirageStatus.EN_COUR ||
            option.value === TirageStatus.EN_VALIDATION,
        );
      case TirageStatus.EN_VALIDATION:
        return this.statusOptions.filter(
          (option) => option.value === TirageStatus.EN_VALIDATION,
        );
      default:
        return this.statusOptions;
    }
  }

  checkIfFormIsChanged(): void {
    if (this.tirageOverview) {
      const currentValue = this.updateTirageForm.value;
      this.formChanged =
        currentValue.name !== this.tirageOverview.name ||
        parseInt(currentValue.reward_price) !==
          this.tirageOverview.reward_price ||
        parseInt(currentValue.max_participants) !==
          this.tirageOverview.max_participants ||
        currentValue.status !== this.tirageOverview.status ||
        currentValue.start_date !== this.tirageOverview.start_date ||
        currentValue.end_date !== this.tirageOverview.end_date;
    }
  }

  isInSimulation(): boolean {
    return (
      this.tirageOverview?.status === TirageStatus.SIMULATION ||
      this.tirageOverview?.status === TirageStatus.SIMULATION_TERMINE
    );
  }

  isDone(): boolean {
    return (
      this.tirageOverview?.status == TirageStatus.TERMINE ||
      this.tirageOverview?.status == TirageStatus.SIMULATION_TERMINE
    );
  }

  viewResult(id: number | undefined): void {
    if (id) {
      this.route.navigate(['/admin/tirage-result', id]);
    }
  }

  saveChanges() {
    if (this.updateTirageForm.valid && this.updateTirageForm.dirty) {
      const currentFormValues = this.updateTirageForm.value;

      const modifiedFields: any = {};

      Object.keys(currentFormValues).forEach((key) => {
        if (
          currentFormValues[key] !==
          this.tirageOverview![key as keyof LotteryOverviewResponse]
        ) {
          modifiedFields[key] = currentFormValues[key];
        }
      });
      this.tirageAdminService
        .updateTirage(this.tirageOverview!.id, modifiedFields)
        .subscribe({
          next: (response) => {
            this.route.navigate(['admin']);
          },
          error: (err: UpdateLotteryError) => {
            this.serverErrors = err;
            this.hasErros = true;
          },
        });
    }
  }

  integerValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return Number.isInteger(+value) ? null : { notInteger: true };
  }

  hasServerError(controlName: string): string | null {
    return this.serverErrors?.details?.[controlName]?.[0] || null;
  }

  navigatToManageParticipant(): void {
    const id: number | undefined = this.tirageOverview?.id;
    if (id) {
      this.route.navigate(['/admin/manage-participants/tirage', id]);
    }
  }

  confirmStatus(): void {
    const id: number | undefined = this.tirageOverview?.id;
    if (id && this.winningNumbersForm.valid) {
      const currentValue = this.winningNumbersForm.value;
      console.log(currentValue);
      const data: AddWiningsNumber = {
        winning_numbers: currentValue.winningNumbers
          ? currentValue.winningNumbers
          : '',
        lucky_numbers: currentValue.bonusNumbers
          ? currentValue.bonusNumbers
          : '',
      };
      this.tirageAdminService.updateTirageToDone(id, data).subscribe({
        next: () => {
          this.route.navigate(['/admin/tirage-result', id]);
        },
        error: (err: UpdateLotteryError) => {
          this.serverErrors = err;
          this.winningNumbersForm.reset();
        },
      });
    }
  }
}
