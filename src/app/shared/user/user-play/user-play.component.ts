import { Component, OnInit } from '@angular/core';
import { CountdownTimerComponent } from '../../timer/countdown-timer/countdown-timer.component';
import { LottoryFormComponent } from '../../lottory-form/lottory-form.component';
import {
  LotteryOverviewError,
  LotteryOverviewResponse,
} from '../../../constants/ressources/user/tirageUserRessource';
import { UserPlayServiceService } from './service/user-play-service.service';
import { UserHistoryService } from '../user-history/service/user-history.service';
import { UserHistoryComponent } from '../user-history/user-history.component';
import { UserSharedService } from '../service/user-shared.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-play',
  standalone: true,
  imports: [CountdownTimerComponent, LottoryFormComponent, CommonModule],
  templateUrl: './user-play.component.html',
  styleUrl: './user-play.component.css',
})
export class UserPlayComponent implements OnInit {
  endDate: Date | null = null;
  curentTirage: LotteryOverviewResponse | null;
  error: LotteryOverviewError | null = null;

  constructor(
    private userPlayService: UserPlayServiceService,
    private userSharedService: UserSharedService,
    private userHistoryService: UserHistoryService,
    private route: Router,
  ) {
    this.curentTirage = {} as LotteryOverviewResponse;
  }
  ngOnInit(): void {
    this.loadCurenTirage();
    this.userSharedService.lotteryUpdate$.subscribe(() => {
      this.loadCurenTirage();
      this.loadUserHistories();
    });
  }

  loadCurenTirage(): void {
    this.userPlayService.getCurentTirage().subscribe({
      next: (data) => {
        this.curentTirage = data;
        if (this.curentTirage && this.curentTirage.end_date) {
          this.endDate = new Date(this.curentTirage.end_date);
        }
        this.error = null;
      },
      error: (err) => {
        this.error = err;
        this.curentTirage = null;
      },
    });
  }

  loadUserHistories(): void {
    this.userHistoryService.getHistory().subscribe({
      next: (data) => {},
      error: (err) => {},
    });
  }
}
