import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LotteryOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import { TirageEditService } from './service/tirage-edit.service';
import { UpdateLotteryError } from '../../../constants/ressources/admin/AdminUpdateLottery';
import {
  StatusOptions,
  TirageStatus,
} from '../../../constants/tirageStatus/tirageStatus.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tirage-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tirage-edit.component.html',
  styleUrl: './tirage-edit.component.css',
})
export class TirageEditComponent {
  @Input() tirage!: LotteryOverviewResponse;
  @Output() updateParent: EventEmitter<void> = new EventEmitter<void>();
  updateTirageForm!: FormGroup;
  editMode: boolean = false;
  serverErrors: UpdateLotteryError | null = null;

  readonly statusOptions: StatusOptions = [
    { value: TirageStatus.EN_COUR, label: 'En cours' },
    { value: TirageStatus.EN_VALIDATION, label: 'En validation' },
    { value: TirageStatus.TERMINE, label: 'Terminé' },
    { value: TirageStatus.SIMULATION_TERMINE, label: 'Simulation terminé' },
  ];

  constructor(
    private updateTirageService: TirageEditService,
    private fb: FormBuilder,
    private route: Router,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.updateTirageForm = this.fb.group({
      name: [this.tirage.name, [Validators.required]],
      reward_price: [this.tirage.reward_price, [Validators.required]],
      max_participants: [
        this.tirage.max_participants,
        [Validators.required, Validators.min(1)],
      ],
      status: [this.tirage.status, [Validators.required]],
      start_date: [this.tirage.start_date, [Validators.required]],
      end_date: [this.tirage.end_date, [Validators.required]],
    });

    this.updateTirageForm.valueChanges.subscribe(() => {
      this.serverErrors = null;
    });
  }

  getStatusOptions() {
    const currentStatus = this.tirage.status;
    switch (currentStatus) {
      case TirageStatus.EN_COUR:
        return this.statusOptions.filter(
          (option) =>
            option.value === TirageStatus.EN_COUR ||
            option.value === TirageStatus.EN_VALIDATION,
        );
      case TirageStatus.EN_VALIDATION:
        return this.statusOptions.filter(
          (option) =>
            option.value === TirageStatus.EN_VALIDATION ||
            option.value === TirageStatus.TERMINE,
        );
      case TirageStatus.SIMULATION:
        return [];
      default:
        return this.statusOptions;
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.updateTirageForm.patchValue(this.tirage);
    }
  }

  isInValidation(): boolean {
    return this.tirage.status == TirageStatus.EN_VALIDATION;
  }

  isInSimulation(): boolean {
    return this.tirage.status == TirageStatus.SIMULATION;
  }

  isDone(): boolean {
    return (
      this.tirage.status == TirageStatus.TERMINE ||
      this.tirage.status == TirageStatus.SIMULATION_TERMINE
    );
  }

  saveChanges() {
    if (this.updateTirageForm.valid && this.updateTirageForm.dirty) {
      const formData = this.updateTirageForm.value;
      this.updateTirageService
        .updateTirage(this.tirage.id, formData)
        .subscribe({
          next: (response) => {
            this.editMode = false;
            this.updateParent.emit();
          },
          error: (err: UpdateLotteryError) => {
            this.serverErrors = err;
          },
        });
    }
  }

  hasServerError(controlName: string): string | null {
    return this.serverErrors?.details?.[controlName]?.[0] || null;
  }

  navigatToManageParticipant(): void {
    this.route.navigate(['manage-participants/tirage', this.tirage.id]);
  }

  navigatToTirageResult(): void {
    //se rediriger vers le composant résultat
  }

  confirmStatus(): void {
    this.updateTirageService.updateTirageToDone(this.tirage.id).subscribe({
      next: (response) => {
        this.updateParent.emit();
      },
      error: (err) => {},
    });
  }
}
