import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { ApiUser } from '../../../../config/api-user';
import {
  LotteryOverviewError,
  LotteryOverviewResponse,
} from '../../../../constants/ressources/user/tirageUserRessource';

/**
 * Service pour gérer les opérations liées aux tirages de loterie.
 */
@Injectable({
  providedIn: 'root',
})
export class UserPlayServiceService {
  private readonly http = inject(HttpClient);
  private currentLotteryUpdated = new Subject<void>();
  currentLotteryUpdated$ = this.currentLotteryUpdated.asObservable();

  /**
   * Récupère les informations sur le tirage actuel.
   *
   * @returns {Observable<LotteryOverviewResponse>} Un observable contenant les informations sur le tirage actuel.
   * @throws {LotteryOverviewError} En cas d'erreur lors de la récupération des informations.
   */
  getCurentTirage(): Observable<LotteryOverviewResponse> {
    return this.http
      .get<LotteryOverviewResponse>(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.CURRENT_LOTTERY}`,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: LotteryOverviewError = {
            errors: true,
            message: error.error?.message || 'Aucun tirage',
          };
          return throwError(() => err);
        }),
      );
  }

  /**
   * Notifie les abonnés que le tirage a été mis à jour.
   */
  notifyLotteryUpdate() {
    this.currentLotteryUpdated.next();
  }

  /**
   * Notifie les abonnés que l'utilisateur s'est inscrit.
   */
  notifyUserRegistered() {
    this.currentLotteryUpdated.next();
  }
}
