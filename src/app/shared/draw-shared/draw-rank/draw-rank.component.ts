import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  DrawRank,
  DrawRanks,
  LotteryInfoRankResponse,
} from '../../../constants/ressources/user/LotteryInfoRessource';
import { ActivatedRoute } from '@angular/router';
import { DrawRankService } from './service/draw-rank.service';

@Component({
  selector: 'app-draw-rank',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draw-rank.component.html',
  styleUrl: './draw-rank.component.css',
})
export class DrawRankComponent implements OnInit {
  players: DrawRanks = [];
  currentUser: DrawRank | undefined;
  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    private activatedRoute: ActivatedRoute,
    private drawRankService: DrawRankService,
  ) {}

  ngOnInit(): void {
    const idNullable = this.activatedRoute.snapshot.paramMap.get('id');
    if (idNullable) {
      this.loadRank(+idNullable);
    }
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

  roundReward(number: number): number {
    if (Number.isInteger(number)) {
      return number;
    }
    return parseFloat(number.toFixed(2));
  }

  loadRank(id: number): void {
    this.drawRankService.getRankTirage(id).subscribe({
      next: (response) => {
        this.players = response.data;
        this.currentUser = response.currentUser;
      },
      error: (error) => {},
    });
  }
}
