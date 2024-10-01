import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  DrawRank,
  DrawRanks,
  LotteryInfoRankResponse,
} from '../../../constants/ressources/user/LotteryInfoRessource';

@Component({
  selector: 'app-draw-rank',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draw-rank.component.html',
  styleUrl: './draw-rank.component.css',
})
export class DrawRankComponent implements OnInit {
  @Input() drawRank!: LotteryInfoRankResponse;

  /**
   * 
  
  players = [
    //Todo info en back-end
    { rank: 1, name: 'Joueur 1', score: 100, winnings: 5000 },
    { rank: 1, name: 'Joueur 2', score: 100, winnings: 5000 },
    { rank: 1, name: 'Joueur 3', score: 100, winnings: 5000 },
    { rank: 1, name: 'Joueur 4', score: 100, winnings: 5000 },
    { rank: 1, name: 'Joueur 5', score: 100, winnings: 5000 },
    { rank: 1, name: 'Joueur 6', score: 100, winnings: 5000 },
    { rank: 1, name: 'Joueur 7', score: 100, winnings: 5000 },
    { rank: 1, name: 'Joueur 8', score: 100, winnings: 5000 },
    { rank: 2, name: 'Joueur 9', score: 85, winnings: 3000 },
    { rank: 2, name: 'Joueur 10', score: 85, winnings: 3000 },
    { rank: 3, name: 'Joueur 11', score: 82, winnings: 1500 }, // Joueur actuel également ici
    { rank: 3, name: 'Joueur 12', score: 82, winnings: 1500 },
    { rank: 4, name: 'Joueur 13', score: 80, winnings: 1000 },
    { rank: 5, name: 'Joueur 14', score: 75, winnings: 900 },
    { rank: 6, name: 'Joueur 15', score: 70, winnings: 800 },
  ];

  currentUser = { rank: 3, name: 'Joueur 12', score: 82, winnings: 1500 };
**/
  players: DrawRanks = [];
  currentUser: DrawRank | undefined;
  currentPage = 1;
  itemsPerPage = 10;

  ngOnInit(): void {
    this.players = this.drawRank.players;
    this.currentUser = this.drawRank.currentUser;
  }

  getPaginatedPlayers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    return this.players.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.players.length / this.itemsPerPage);
  }

  getTotalPagesArray() {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  isCurrentUserOnCurrentPage() {
    return this.getPaginatedPlayers().some(
      (player) => player.name === this.currentUser?.name,
    );
  }
}
