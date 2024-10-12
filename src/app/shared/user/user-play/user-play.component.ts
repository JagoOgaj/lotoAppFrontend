import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  LotteryOverviewError,
  LotteryOverviewResponse,
} from '../../../constants/ressources/user/tirageUserRessource';
import { LottoryFormComponent } from '../../lottory-form/lottory-form.component';
import { CountdownTimerComponent } from '../../timer/countdown-timer/countdown-timer.component';
import { UserSharedService } from '../service/user-shared.service';
import { UserHistoryService } from '../user-history/service/user-history.service';
import { UserPlayServiceService } from './service/user-play-service.service';

/**
 * Composant pour afficher et gérer les jeux de loterie de l'utilisateur.
 */
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

  /**
   * @param userPlayService - Service pour gérer les opérations de loterie.
   * @param userSharedService - Service partagé pour la gestion de l'utilisateur.
   * @param userHistoryService - Service pour récupérer l'historique de l'utilisateur.
   * @param route - Router pour la navigation.
   */
  constructor(
    private userPlayService: UserPlayServiceService,
    private userSharedService: UserSharedService,
    private userHistoryService: UserHistoryService,
  ) {
    this.curentTirage = {} as LotteryOverviewResponse;
  }

  /**
   * Méthode de cycle de vie appelée lors de l'initialisation du composant.
   */
  ngOnInit(): void {
    this.loadCurenTirage();
    this.userSharedService.lotteryUpdate$.subscribe(() => {
      this.loadCurenTirage();
      this.loadUserHistories();
    });
  }

  /**
   * Charge les informations sur le tirage actuel.
   */
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

  /**
   * Charge l'historique des jeux de l'utilisateur.
   */
  loadUserHistories(): void {
    this.userHistoryService.getHistory().subscribe({
      next: (data) => {},
      error: (err) => {},
    });
  }
}
