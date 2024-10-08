import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LotteryOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import {
  ParticipantRessource,
  Participants,
} from '../../../constants/ressources/admin/AdminParticipantsRessource';
import { ParticipantsListService } from './service/participants-list.service';
import {
  AddParticipantRessource,
  AddParticipantsError,
  ManageRemoveParticipant,
} from '../../../constants/ressources/admin/AdminManageParticipantsRessource';
import { TirageStatus } from '../../../constants/tirageStatus/tirageStatus.constants';

@Component({
  selector: 'app-participants-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './participants-list.component.html',
  styleUrl: './participants-list.component.css',
})
export class ParticipantsListComponent implements OnInit, OnChanges {
  @Input() tirage!: LotteryOverviewResponse;
  @Input() participants!: Participants;
  @Input() paginatedParticipants: Participants = [];
  @Input() searchTerm: string = '';
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Input() itemsPerPage: number = 5;
  @Output() updateParent: EventEmitter<void> = new EventEmitter<void>();
  newUser: FormGroup;
  pages: number[] = [];
  selectedUser: ParticipantRessource | null = null;
  backendErrors: AddParticipantsError | null = {
    errors: true,
    message: '',
    details: {},
  };

  constructor(
    private participantsService: ParticipantsListService,
    private fb: FormBuilder,
  ) {
    this.newUser = this.fb.group({
      user_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
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

  ngOnInit(): void {
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['participants']) {
      this.newUser.reset();
      document.getElementById('addUserCollapse')?.classList.remove('show');
      this.updatePagination();
    }
  }

  setSelectedUser(participant: ParticipantRessource) {
    this.selectedUser = participant;
  }

  filterParticipants() {
    this.currentPage = 1;
    this.updatePagination();
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

  canAddUser(): boolean {
    return this.tirage.participant_count >= this.tirage.max_participants;
  }

  hasParticipants(): boolean {
    return this.tirage.participant_count > 0;
  }

  updatePagination() {
    if (this.participants === null) {
      this.participants = [];
    }

    const filtered = this.participants.filter((participant) =>
      participant.user_name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase()),
    );

    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);

    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }

    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedParticipants = filtered.slice(
      start,
      start + this.itemsPerPage,
    );

    this.pages = Array.from({ length: this.totalPages }, (v, i) => i + 1);
  }

  getVisiblePages(): number[] {
    const visiblePages = [];
    const totalPages = this.totalPages;

    // Logique pour afficher les pages
    if (totalPages <= 5) {
      // Afficher toutes les pages si <= 5 pages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Toujours afficher la première page
    visiblePages.push(1);

    // Afficher des ellipses si la page actuelle n'est pas près du début

    // Ajouter les pages autour de la page actuelle
    for (
      let i = Math.max(2, this.currentPage - 1);
      i <= Math.min(totalPages - 1, this.currentPage + 1);
      i++
    ) {
      visiblePages.push(i);
    }

    // Toujours afficher la dernière page
    if (totalPages > 1) {
      visiblePages.push(totalPages);
    }

    return visiblePages;
  }

  isDone(): boolean {
    return (
      this.tirage?.status == TirageStatus.TERMINE ||
      this.tirage?.status == TirageStatus.SIMULATION_TERMINE
    );
  }

  submitForm(): void {
    this.backendErrors = null;
    if (this.newUser.valid) {
      const formData = this.newUser.value;
      const dataToSubmit: AddParticipantRessource = {
        user_name: formData.user_name,
        email: formData.email,
        numbers: `${formData.numbers.num1},${formData.numbers.num2},${formData.numbers.num3},${formData.numbers.num4},${formData.numbers.num5}`,
        numbers_lucky: `${formData.lucky_numbers.lucky1},${formData.lucky_numbers.lucky2}`,
      };
      this.participantsService
        .addParticipant(dataToSubmit, this.tirage.id)
        .subscribe({
          next: (response) => {
            this.updateParent.emit();
            this.backendErrors = null;
          },
          error: (err: AddParticipantsError) => {
            this.backendErrors = err;
            this.newUser.reset();
            document
              .getElementById('addUserCollapse')
              ?.classList.remove('show');
          },
        });
    }
  }

  populateFakeUser(id: number): void {
    if (id) {
      this.participantsService.populateFakeUser(id).subscribe({
        next: (response) => {
          this.updateParent.emit();
        },
        error: (err) => {},
      });
    }
  }

  hasServerErorr(controlName: string): string | null {
    return this.backendErrors?.details?.[controlName]?.[0] || null;
  }

  confirmDelete(): void {
    if (this.selectedUser) {
      const dataToSubmit: ManageRemoveParticipant = {
        lottery_id: this.tirage.id,
        user_id: this.selectedUser.user_id,
      };
      this.participantsService.removeParticipant(dataToSubmit).subscribe({
        next: (response) => {
          this.updateParent.emit();
        },
        error: (err) => {},
      });
    }
  }
}
