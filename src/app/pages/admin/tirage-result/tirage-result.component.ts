import { Component, OnInit } from '@angular/core';
import { DrawRanks } from '../../../constants/ressources/admin/LotteryInfoRessource';
import { TirageResultService } from './service/tirage-result.service';
import { ActivatedRoute } from '@angular/router';
import { LotteryOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import { AdminSharedService } from '../service/admin-shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tirage-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tirage-result.component.html',
  styleUrl: './tirage-result.component.css',
})
export class TirageResultComponent implements OnInit {
  ranking: DrawRanks | null = null;
  lotteryInfo: LotteryOverviewResponse | null = null;
  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    private tirageResultService: TirageResultService,
    private activatedRoute: ActivatedRoute,
    private tirageDetailsAdmin: AdminSharedService,
  ) {}

  ngOnInit(): void {
    const idNullable = this.activatedRoute.snapshot.paramMap.get('id');
    if (idNullable) {
      this.loadRank(+idNullable);
      this.loadDetails(+idNullable);
    }
  }

  getPaginatedPlayers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    return this.ranking?.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.ranking!.length / this.itemsPerPage);
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

  loadRank(id: number): void {
    this.tirageResultService.getRank(id).subscribe({
      next: (response) => {
        this.ranking = response.data;
      },
      error: (error) => {},
    });
  }

  loadDetails(id: number): void {
    this.tirageDetailsAdmin.getTirageDetails(id).subscribe({
      next: (response) => {
        this.lotteryInfo = response.data;
      },
      error: (err) => {},
    });
  }
}
