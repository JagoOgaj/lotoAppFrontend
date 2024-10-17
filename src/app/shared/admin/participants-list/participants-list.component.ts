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

/**
 * Composant pour gérer la liste des participants.
 */
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

  /**
   * Constructeur du composant ParticipantsListComponent.
   * @param participantsService - Service pour gérer les participants.
   * @param fb - FormBuilder pour gérer les formulaires.
   */
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
          [Validators.required, Validators.min(1), Validators.max(49)],
        ],
        num2: [
          null,
          [Validators.required, Validators.min(1), Validators.max(49)],
        ],
        num3: [
          null,
          [Validators.required, Validators.min(1), Validators.max(49)],
        ],
        num4: [
          null,
          [Validators.required, Validators.min(1), Validators.max(49)],
        ],
        num5: [
          null,
          [Validators.required, Validators.min(1), Validators.max(49)],
        ],
      }),
      lucky_numbers: this.fb.group({
        lucky1: [
          null,
          [Validators.required, Validators.min(1), Validators.max(9)],
        ],
        lucky2: [
          null,
          [Validators.required, Validators.min(1), Validators.max(9)],
        ],
      }),
    });
  }

  /**
   * Méthode appelée lors de l'initialisation du composant.
   */
  ngOnInit(): void {
    this.updatePagination();
  }

  /**
   * Méthode appelée lorsqu'il y a des changements dans les entrées du composant.
   * @param changes - Changements des propriétés d'entrée.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['participants']) {
      this.newUser.reset();
      document.getElementById('addUserCollapse')?.classList.remove('show');
      this.updatePagination();
    }
  }

  /**
   * Définit l'utilisateur sélectionné pour la suppression.
   * @param participant - L'utilisateur participant à sélectionner.
   */
  setSelectedUser(participant: ParticipantRessource) {
    this.selectedUser = participant;
  }

  /**
   * Filtre les participants en fonction du terme de recherche.
   */
  filterParticipants() {
    this.currentPage = 1;
    this.updatePagination();
  }

  /**
   * Passe à la page suivante de participants.
   */
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  /**
   * Passe à la page précédente de participants.
   */
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  /**
   * Va à la page spécifiée.
   * @param page - Numéro de la page à aller.
   */
  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  /**
   * Vérifie si un utilisateur peut être ajouté.
   * @returns True si l'utilisateur peut être ajouté, sinon False.
   */
  canAddUser(): boolean {
    return (
      this.tirage.participant_count >= this.tirage.max_participants ||
      !(
        this.tirage.status != TirageStatus.SIMULATION_TERMINE &&
        this.tirage.status != TirageStatus.TERMINE
      )
    );
  }

  /**
   * Vérifie si des participants existent.
   * @returns True si des participants existent, sinon False.
   */
  hasParticipants(): boolean {
    return this.tirage.participant_count > 0;
  }

  /**
   * Met à jour la pagination des participants.
   */
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

  /**
   * Obtient les pages visibles pour la pagination.
   * @returns Un tableau de numéros de pages visibles.
   */
  getVisiblePages(): number[] {
    const visiblePages = [];
    const totalPages = this.totalPages;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    visiblePages.push(1);

    for (
      let i = Math.max(2, this.currentPage - 1);
      i <= Math.min(totalPages - 1, this.currentPage + 1);
      i++
    ) {
      visiblePages.push(i);
    }

    if (totalPages > 1) {
      visiblePages.push(totalPages);
    }

    return visiblePages;
  }

  /**
   * Vérifie si le tirage est terminé.
   * @returns True si le tirage est terminé, sinon False.
   */
  isDone(): boolean {
    return (
      this.tirage?.status == TirageStatus.TERMINE ||
      this.tirage?.status == TirageStatus.SIMULATION_TERMINE
    );
  }

  /**
   * Soumet le formulaire pour ajouter un nouvel utilisateur.
   */
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
          },
        });
    }
  }

  /**
   * Remplit un utilisateur fictif.
   * @param id - Identifiant de la loterie.
   */
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

  /**
   * Vérifie si une erreur du serveur est présente pour le contrôle spécifié.
   * @param controlName - Nom du contrôle à vérifier.
   * @returns Message d'erreur ou null.
   */
  hasServerErorr(controlName: string): string | null {
    return this.backendErrors?.details?.[controlName]?.[0] || null;
  }

  /**
   * Confirme la suppression d'un participant sélectionné.
   */
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
