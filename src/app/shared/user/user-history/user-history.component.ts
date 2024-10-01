import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHistoryService } from './service/user-history.service';
import { LotteryHistories } from '../../../constants/ressources/user/tirageUserRessource';
import { UserSharedService } from '../service/user-shared.service';
import { TirageStatus } from '../../../constants/tirageStatus/tirageStatus.constants';

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css',
})
export class UserHistoryComponent implements OnInit {
  private readonly router = Inject(Router);
  parties: any[] = []; // Liste des parties
  paginatedParties: LotteryHistories = []; // Liste des parties à afficher pour la page courante
  currentPage: number = 1;
  itemsPerPage: number = 3; // Nombre de cartes par page
  totalPages: number = 0;
  pages: number[] = [];
  histories: LotteryHistories | null = null;

  constructor(private userHistoryService: UserHistoryService) {}

  ngOnInit(): void {
    // Exemples de parties jouées
    /*
    this.parties = [
      {
        id: 1,
        date: '12 septembre 2024',
        statut: 'Terminé',
        numerosJoues: '3, 16, 22, 35, 49',
        numerosChance: '7, 9',
        dateTirage: '14 septembre 2024',
      },
      {
        id: 2,
        date: '5 septembre 2024',
        statut: 'En cours',
        numerosJoues: '2, 13, 28, 44, 50',
        numerosChance: '4, 10',
        dateTirage: '7 septembre 2024',
      },
      {
        id: 3,
        date: '1 septembre 2024',
        statut: 'En vérification',
        numerosJoues: '5, 12, 23, 38, 49',
        numerosChance: '2, 6',
        dateTirage: '3 septembre 2024',
      },
      {
        id: 4,
        date: '28 août 2024',
        statut: 'Terminé',
        numerosJoues: '10, 21, 30, 33, 47',
        numerosChance: '8, 10',
        dateTirage: '31 août 2024',
      },
      // Plus de parties...
    ];
*/ this.loadHistories();
    // Calculer le nombre total de pages
    if (this.histories) {
      this.histories = this.histories;
      // Calculer le nombre total de pages
      this.totalPages = Math.ceil(this.parties.length / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (v, i) => i + 1);
      this.paginate();
    }
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
    this.router.navigate(['/draw', id]);
  }

  loadHistories(): void {
    this.userHistoryService.getHistory().subscribe({
      next: (data) => {
        this.histories = data.data;
      },
      error: (err) => {},
    });
  }
}
