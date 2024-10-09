import { Component, inject, OnInit } from '@angular/core';
import { NavbarSharedComponent } from '../../shared/navbar-shared/navbar-shared.component';
import { DrawRankComponent } from '../../shared/draw-shared/draw-rank/draw-rank.component';
import { DrawOverviewComponent } from '../../shared/draw-shared/draw-overview/draw-overview.component';
import { FooterSharedComponent } from '../../shared/footer-shared/footer-shared.component';
import { ActivatedRoute } from '@angular/router';
import { DrawService } from './service/draw.service';
import {
  LotteryOverviewResponse,
  LotteryResultReponse,
} from '../../constants/ressources/user/tirageUserRessource';
import { LotteryInfoRankResponse } from '../../constants/ressources/user/LotteryInfoRessource';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-draw',
  standalone: true,
  imports: [
    NavbarSharedComponent,
    DrawRankComponent,
    DrawOverviewComponent,
    FooterSharedComponent,
    CommonModule,
  ],
  templateUrl: './draw.component.html',
  styleUrl: './draw.component.css',
})
export class DrawComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  pageState: string = 'draw';
  tirageOverview: LotteryOverviewResponse;
  results: LotteryResultReponse = {
    winning_numbers: '',
    lucky_numbers: '',
  };
  tirageRank: LotteryInfoRankResponse;

  constructor(private drawService: DrawService) {
    this.tirageOverview = {} as LotteryOverviewResponse;
    this.tirageRank = {} as LotteryInfoRankResponse;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    const idNullable = this.activatedRoute.snapshot.paramMap.get('id');
    if (idNullable) {
      const realId = +idNullable;
      this.loadTirageOverview(realId);
    }
  }

  loadTirageOverview(id: number): void {
    this.drawService.getTirageOverview(id).subscribe({
      next: (data) => {
        this.tirageOverview = data.data;
        this.results = data.numbers;
      },
      error: (err) => {},
    });
  }
}
