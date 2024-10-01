import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  CreateTirageError,
  CreateTirageRessource,
} from '../../../constants/ressources/admin/AdminCreateDeleteTirageRessource';
import { LotteriesOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import { TirageOverviewComponent } from '../tirage-overview/tirage-overview.component';
import { TirageListSharedService } from './service/tirage-list-shared.service';

@Component({
  selector: 'app-tirage-list-shared',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TirageOverviewComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './tirage-list-shared.component.html',
  styleUrl: './tirage-list-shared.component.css',
})
export class TirageListSharedComponent {
  @Input() tirages!: LotteriesOverviewResponse;
  @Output() updateParent: EventEmitter<void> = new EventEmitter<void>();

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 0;
  paginatedTirages: LotteriesOverviewResponse = [];
  pages: number[] = [];
  startDate!: Date;
  endDate!: Date;
  statusFilter: string = '';
  idTirageToDelete: number | null = null;
  newTirage: FormGroup;
  showDateFields: boolean = true;
  severErrors: CreateTirageError | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tirageListService: TirageListSharedService,
  ) {
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
    this.updatePagination();
  }

  updatePagination() {
    if (!this.tirages) {
      this.tirages = [];
    }
    this.filterTirages();

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.paginatedTirages = this.tirages.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage,
    );
  }

  filterTirages() {
    let filtered = this.tirages.filter((tirage) =>
      tirage.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );

    if (this.statusFilter) {
      filtered = filtered.filter(
        (tirage) => tirage.status === this.statusFilter,
      );
    }

    if (this.startDate) {
      const startDate = new Date(this.startDate);
      filtered = filtered.filter((tirage) => {
        if (tirage.start_date) {
          const tirageDate = new Date(tirage.start_date);
          return (
            tirageDate.getFullYear() === startDate.getFullYear() &&
            tirageDate.getMonth() === startDate.getMonth() &&
            tirageDate.getDate() === startDate.getDate()
          );
        }
        return '';
      });
    }
    if (this.endDate) {
      const endDate = new Date(this.endDate);
      filtered = filtered.filter((tirage) => {
        if (tirage.end_date) {
          const tirageEndDate = new Date(tirage.end_date);
          return (
            tirageEndDate.getFullYear() === endDate.getFullYear() &&
            tirageEndDate.getMonth() === endDate.getMonth() &&
            tirageEndDate.getDate() === endDate.getDate()
          );
        }
        return '';
      });
    }

    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);

    this.paginatedTirages = filtered.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage,
    );
    this.pages = Array.from({ length: this.totalPages }, (v, i) => i + 1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  viewDetails(id: number) {
    if (id) {
      this.router.navigate(['/tirage-details', id]);
    }
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

  confirmDelete(id: number) {
    if (id) {
      this.idTirageToDelete = id;
    }
  }

  deleteTirage() {
    if (this.idTirageToDelete) {
      this.tirageListService.deleteTirage(this.idTirageToDelete).subscribe({
        next: (respons) => {
          this.updateParent.emit();
        },
        error: (err) => {},
      });
    }
  }

  createTirage() {
    this.severErrors = null; // Réinitialiser les erreurs serveur
    if (this.newTirage.valid) {
      const formValue = this.newTirage.value;

      const dataToSubmit: CreateTirageRessource = {
        name: formValue.name,
        reward_price: formValue.reward_price,
        max_participants: formValue.max_participants,
      };

      if (formValue.status === 'EN_COUR') {
        dataToSubmit.start_date = formValue.start_date;
        dataToSubmit.end_date = formValue.end_date;
      }

      this.tirageListService.createTirage(dataToSubmit).subscribe({
        next: (response) => {
          this.updateParent.emit();
        },
        error: (error) => {
          this.severErrors = error;
          this.handleServerErrors(this.severErrors!);
        },
      });
    }
  }

  handleServerErrors(errorResponse: CreateTirageError) {
    this.newTirage.setErrors(null);

    if (errorResponse.details) {
      const details = errorResponse.details;

      if (details.name) {
        this.newTirage.get('name')?.setErrors({ serverError: details.name[0] });
      }

      if (details.reward_price) {
        this.newTirage
          .get('reward_price')
          ?.setErrors({ serverError: details.reward_price[0] });
      }

      if (details.max_participants) {
        this.newTirage
          .get('max_participants')
          ?.setErrors({ serverError: details.max_participants[0] });
      }

      if (details.status) {
        this.newTirage
          .get('status')
          ?.setErrors({ serverError: details.status[0] });
      }

      if (details.start_date) {
        this.newTirage
          .get('start_date')
          ?.setErrors({ serverError: details.start_date[0] });
      }

      if (details.end_date) {
        this.newTirage
          .get('end_date')
          ?.setErrors({ serverError: details.end_date[0] });
      }

      Object.keys(details).forEach((key) => {
        if (this.newTirage.get(key)) {
          this.newTirage.get(key)?.setErrors({ serverError: details[key][0] });
        }
      });
    }
  }
}
