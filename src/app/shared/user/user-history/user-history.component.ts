import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHistoryService } from './service/user-history.service';
import { LotteryHistories } from '../../../constants/ressources/user/tirageUserRessource';
import { TirageStatus } from '../../../constants/tirageStatus/tirageStatus.constants';
import { UserSharedService } from '../service/user-shared.service';

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css',
})
export class UserHistoryComponent implements OnInit {
  parties: any[] = []; // Liste des parties
  paginatedParties: LotteryHistories = []; // Liste des parties à afficher pour la page courante
  currentPage: number = 1;
  itemsPerPage: number = 3; // Nombre de cartes par page
  totalPages: number = 0;
  pages: number[] = [];
  histories: LotteryHistories | null = null;

  constructor(
    private userHistoryService: UserHistoryService,
    private router: Router,
    private userSharedService: UserSharedService,
  ) {}

  ngOnInit(): void {
    this.loadHistories();
    this.userSharedService.lotteryUpdate$.subscribe(() => {
      // Écoute des mises à jour de loterie
      this.loadHistories(); // Recharge les historiques à chaque mise à jour
    });
  }

  // Méthode pour changer de page
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginate();
  }

  // Paginer les données
  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedParties = this.parties.slice(startIndex, endIndex);
  }

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

  canShowDetails(status: string): boolean {
    return this.tirageIsDone(status);
  }

  tirageIsDone(status: string): boolean {
    return status == TirageStatus.TERMINE;
  }

  tirageIsInValidation(status: string): boolean {
    return status == TirageStatus.EN_VALIDATION;
  }

  tirageIsInCurrent(status: string): boolean {
    return status == TirageStatus.EN_COUR;
  }

  voirDetailsTirage(id: number): void {
    if (id) {
      this.router.navigate(['/draw', id]);
    }
  }

  loadHistories(): void {
    this.userHistoryService.getHistory().subscribe({
      next: (data) => {
        this.histories = data.data;
        this.updatePagination();
      },
      error: (err) => {},
    });
  }

  updatePagination(): void {
    if (this.histories) {
      this.parties = this.histories; // Assigner les parties ici
      this.totalPages = Math.ceil(this.parties.length / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (v, i) => i + 1);
      this.paginate(); // Effectuer la pagination ici
    }
  }
}
