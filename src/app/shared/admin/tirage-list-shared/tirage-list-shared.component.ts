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
import { Router } from '@angular/router';
import {
  CreateTirageError,
  CreateTirageRessource,
} from '../../../constants/ressources/admin/AdminCreateDeleteTirageRessource';
import { LotteriesOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import { TirageOverviewComponent } from '../tirage-overview/tirage-overview.component';
import { TirageListSharedService } from './service/tirage-list-shared.service';
import { TirageStatus } from '../../../constants/tirageStatus/tirageStatus.constants';

/**
 * Composant partagé pour afficher et gérer la liste des tirages.
 *
 * @component TirageListSharedComponent
 * @description Ce composant permet d'afficher, de filtrer, de créer et de supprimer des tirages.
 *
 * @import { CommonModule } from '@angular/common';
 * @import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 * @import { Router } from '@angular/router';
 * @import { CreateTirageError, CreateTirageRessource } from '../../../constants/ressources/admin/AdminCreateDeleteTirageRessource';
 * @import { LotteriesOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
 * @import { TirageOverviewComponent } from '../tirage-overview/tirage-overview.component';
 * @import { TirageListSharedService } from './service/tirage-list-shared.service';
 * @import { TirageStatus } from '../../../constants/tirageStatus/tirageStatus.constants';
 */
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
export class TirageListSharedComponent implements OnInit, OnChanges {
  @Input() tirages!: LotteriesOverviewResponse;
  @Output() updateParent: EventEmitter<void> = new EventEmitter<void>();
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 0;
  paginatedTirages: LotteriesOverviewResponse = [];
  pages: number[] = [];
  startDate!: Date | undefined;
  endDate!: Date | undefined;
  statusFilter: string = '';
  idTirageToDelete: number | null = null;
  newTirage: FormGroup;
  showDateFields: boolean = true;
  severErrors: CreateTirageError | null = {
    errors: true,
    message: '',
    details: {},
  };

  /**
   * Constructeur du composant.
   * @param fb - FormBuilder pour gérer les formulaires.
   * @param router - Router pour la navigation.
   * @param tirageListService - Service pour les opérations sur les tirages.
   */
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

  /**
   * Méthode appelée lors de l'initialisation du composant.
   */
  ngOnInit(): void {
    this.updatePagination();
  }

  /**
   * Méthode appelée lorsqu'il y a des changements dans les entrées.
   * @param changes - Les changements détectés.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tirages']) {
      this.newTirage.reset();
      this.resetFilters();
      document.getElementById('addUserCollapseId')?.classList.remove('show');
      this.updatePagination();
    }
  }

  /**
   * Met à jour la pagination des tirages.
   */
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

  /**
   * Filtre les tirages en fonction des critères spécifiés.
   */
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
      this.updatePagination();
    }

    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);

    this.paginatedTirages = filtered.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage,
    );
    this.pages = Array.from({ length: this.totalPages }, (v, i) => i + 1);
  }

  /**
   * Vérifie si le statut est "SIMULATION" ou "SIMULATION_TERMINE".
   * @returns {boolean} - Vrai si le statut est "SIMULATION" ou "SIMULATION_TERMINE".
   */
  isStatusSimulationOrTermine(): boolean {
    return (
      this.statusFilter === 'SIMULATION' ||
      this.statusFilter === 'SIMULATION_TERMINE'
    );
  }

  /**
   * Réinitialise les filtres de recherche.
   */
  resetFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.startDate = undefined;
    this.endDate = undefined;
    this.updatePagination();
  }

  /**
   * Passe à la page suivante.
   */
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  /**
   * Passe à la page précédente.
   */
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  /**
   * Va à une page spécifiée.
   * @param {number} page - Le numéro de la page à afficher.
   */
  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  /**
   * Affiche les détails d'un tirage.
   * @param {number} id - L'ID du tirage à afficher.
   */
  viewDetails(id: number) {
    if (id) {
      this.router.navigate(['/admin/tirage-details', id]);
    }
  }

  /**
   * Transforme le statut pour l'affichage.
   * @param {string} status - Le statut à transformer.
   * @returns {string} - Le statut sous forme lisible pour l'utilisateur.
   */
  renderStatusToTemplate(status: string): string {
    if (status == TirageStatus.EN_COUR) {
      return 'En cour';
    }
    if (status == TirageStatus.EN_VALIDATION) {
      return 'En validation';
    }
    if (status == TirageStatus.TERMINE) {
      return 'Termine';
    }
    if (status == TirageStatus.SIMULATION) {
      return 'Simulation';
    }
    if (status == TirageStatus.SIMULATION_TERMINE) {
      return 'Simulation termine';
    }
    return '';
  }

  /**
   * Vérifie si un contrôle du formulaire a des erreurs serveur.
   * @param {string} controlName - Le nom du contrôle à vérifier.
   * @returns {string | null} - Le message d'erreur, ou null s'il n'y a pas d'erreur.
   */
  hasServerError(controlName: string): string | null {
    return this.severErrors?.details?.[controlName]?.[0] || null;
  }

  /**
   * Gère le changement de statut du tirage.
   */
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

    this.filterTirages();
  }

  /**
   * Confirme la suppression d'un tirage.
   * @param {number} id - L'ID du tirage à supprimer.
   */
  confirmDelete(id: number) {
    if (id) {
      this.idTirageToDelete = id;
    }
  }

  /**
   * Supprime le tirage confirmé.
   */
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

  /**
   * Crée un nouveau tirage à partir des données du formulaire.
   */
  createTirage() {
    this.severErrors = null;
    if (this.newTirage.valid) {
      const formValue = this.newTirage.value;

      const dataToSubmit: CreateTirageRessource = {
        name: formValue.name,
        reward_price: formValue.reward_price,
        max_participants: formValue.max_participants,
        status: formValue.status,
      };

      if (formValue.status === TirageStatus.EN_COUR) {
        dataToSubmit.start_date = formValue.start_date;
        dataToSubmit.end_date = formValue.end_date;
      }

      this.tirageListService.createTirage(dataToSubmit).subscribe({
        next: (response) => {
          this.updateParent.emit();
        },
        error: (error: CreateTirageError) => {
          this.severErrors = error;
          this.newTirage.reset();
        },
      });
    }
  }
}
