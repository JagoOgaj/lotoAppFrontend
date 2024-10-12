import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHistoryService } from './service/user-history.service';
import { LotteryHistories } from '../../../constants/ressources/user/tirageUserRessource';
import { TirageStatus } from '../../../constants/tirageStatus/tirageStatus.constants';
import { UserSharedService } from '../service/user-shared.service';

/**
 * Composant pour afficher l'historique des loteries.
 * @class UserHistoryComponent
 * @implements OnInit
 * @description Ce composant récupère et affiche l'historique des tirages de loterie.
 */
@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css',
})
export class UserHistoryComponent implements OnInit {
  parties: any[] = [];
  paginatedParties: LotteryHistories = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  pages: number[] = [];
  histories: LotteryHistories | null = null;

  /**
   * Constructeur du composant.
   * @constructor
   * @param {UserHistoryService} userHistoryService - Service pour récupérer l'historique des loteries.
   * @param {Router} router - Service de routage Angular.
   * @param {UserSharedService} userSharedService - Service partagé pour gérer les mises à jour de loterie.
   */
  constructor(
    private userHistoryService: UserHistoryService,
    private router: Router,
    private userSharedService: UserSharedService,
  ) {}

  /**
   * Méthode de cycle de vie appelée lors de l'initialisation du composant.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.loadHistories();
    this.userSharedService.lotteryUpdate$.subscribe(() => {
      this.loadHistories();
    });
  }

  /**
   * Navigue vers une page spécifique.
   * @method goToPage
   * @param {number} page - Numéro de la page à afficher.
   */
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginate();
  }

  /**
   * Paginer les parties pour l'affichage.
   * @method paginate
   */
  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedParties = this.parties.slice(startIndex, endIndex);
  }

  /**
   * Convertit l'état d'un tirage en une chaîne de texte pour l'affichage.
   * @method renderStatusToTemplate
   * @param {string} status - L'état du tirage.
   * @returns {string} L'état du tirage sous forme lisible.
   */
  renderStatusToTemplate(status: string): string {
    if (this.tirageIsInCurrent(status)) {
      return 'En cours';
    } else if (this.tirageIsInValidation(status)) {
      return 'En validation';
    } else if (this.tirageIsDone(status)) {
      return 'Termine';
    }
    return '';
  }

  /**
   * Vérifie si les détails du tirage peuvent être affichés.
   * @method canShowDetails
   * @param {string} status - L'état du tirage.
   * @returns {boolean} Vrai si les détails peuvent être affichés, sinon faux.
   */
  canShowDetails(status: string): boolean {
    return this.tirageIsDone(status);
  }

  /**
   * Vérifie si le tirage est terminé.
   * @method tirageIsDone
   * @param {string} status - L'état du tirage.
   * @returns {boolean} Vrai si le tirage est terminé, sinon faux.
   */
  tirageIsDone(status: string): boolean {
    return status == TirageStatus.TERMINE;
  }

  /**
   * Vérifie si le tirage est en validation.
   * @method tirageIsInValidation
   * @param {string} status - L'état du tirage.
   * @returns {boolean} Vrai si le tirage est en validation, sinon faux.
   */
  tirageIsInValidation(status: string): boolean {
    return status == TirageStatus.EN_VALIDATION;
  }

  /**
   * Vérifie si le tirage est en cours.
   * @method tirageIsInCurrent
   * @param {string} status - L'état du tirage.
   * @returns {boolean} Vrai si le tirage est en cours, sinon faux.
   */
  tirageIsInCurrent(status: string): boolean {
    return status == TirageStatus.EN_COUR;
  }

  /**
   * Navigue vers la page de détails du tirage.
   * @method voirDetailsTirage
   * @param {number} id - L'ID du tirage.
   */
  voirDetailsTirage(id: number): void {
    if (id) {
      this.router.navigate(['/draw', id]);
    }
  }

  /**
   * Charge l'historique des tirages.
   * @method loadHistories
   */
  loadHistories(): void {
    this.userHistoryService.getHistory().subscribe({
      next: (data) => {
        this.histories = data.data;
        this.updatePagination();
      },
      error: (err) => {},
    });
  }

  /**
   * Met à jour la pagination en fonction des histoires chargées.
   * @method updatePagination
   */
  updatePagination(): void {
    if (this.histories) {
      this.parties = this.histories;
      this.totalPages = Math.ceil(this.parties.length / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (v, i) => i + 1);
      this.paginate();
    }
  }
}
