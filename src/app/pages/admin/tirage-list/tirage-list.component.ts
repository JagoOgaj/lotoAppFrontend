import { Component, OnInit } from '@angular/core';
import { TirageListSharedComponent } from '../../../shared/admin/tirage-list-shared/tirage-list-shared.component';
import { LotteriesOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import { TirageListService } from './service/tirage-list.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  CreateTirageError,
  CreateTirageRessource,
} from '../../../constants/ressources/admin/AdminCreateDeleteTirageRessource';
import { TirageListSharedService } from '../../../shared/admin/tirage-list-shared/service/tirage-list-shared.service';

@Component({
  selector: 'app-tirage-list',
  standalone: true,
  imports: [TirageListSharedComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './tirage-list.component.html',
  styleUrl: './tirage-list.component.css',
})
export class TirageListComponent implements OnInit {
  tirages: LotteriesOverviewResponse;
  newTirage: FormGroup;
  showDateFields: boolean = true;
  severErrors: CreateTirageError | null = {
    errors: true,
    message: '',
    details: {},
  };

  constructor(
    private tirageListService: TirageListService,
    private tirageCreateService: TirageListSharedService,
    private fb: FormBuilder,
  ) {
    this.tirages = [] as LotteriesOverviewResponse;
    this.newTirage = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      start_date: [''],
      end_date: [''],
      status: ['', Validators.required],
      reward_price: ['', [Validators.required, Validators.min(1)]],
      max_participants: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadTirages();
  }

  loadTirages(): void {
    this.tirageListService.getTirageList().subscribe({
      next: (data) => {
        this.tirages = data.data;
      },
      error: (err) => {},
    });
  }

  onUpdate(): void {
    console.log('uddate');
    this.loadTirages();
  }

  onStatusChange(): void {
    const statusControl = this.newTirage.get('status')?.value;

    if (statusControl === 'SIMULATION') {
      this.showDateFields = false;
      this.newTirage.get('start_date')?.clearValidators();
      this.newTirage.get('end_date')?.clearValidators();
    } else {
      this.showDateFields = true;
      this.newTirage.get('start_date')?.setValidators([Validators.required]);
      this.newTirage.get('end_date')?.setValidators([Validators.required]);
    }
    this.newTirage.get('start_date')?.updateValueAndValidity();
    this.newTirage.get('end_date')?.updateValueAndValidity();
  }

  createTirage() {
    this.severErrors = null; // Réinitialiser les erreurs serveur
    if (this.newTirage.valid) {
      const formValue = this.newTirage.value;

      const dataToSubmit: CreateTirageRessource = {
        name: formValue.name,
        reward_price: formValue.reward_price,
        max_participants: formValue.max_participants,
        status: formValue.status,
      };

      if (formValue.status === 'EN_COUR') {
        dataToSubmit.start_date = formValue.start_date;
        dataToSubmit.end_date = formValue.end_date;
      }

      this.tirageCreateService.createTirage(dataToSubmit).subscribe({
        next: (response) => {
          this.loadTirages();
        },
        error: (error: CreateTirageError) => {
          this.severErrors = error;
          this.newTirage.reset();
        },
      });
    }
  }

  hasServerError(controlName: string): string | null {
    return this.severErrors?.details?.[controlName]?.[0] || null;
  }
}
