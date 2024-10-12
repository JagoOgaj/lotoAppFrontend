import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  AdminLotteryInfoRankError,
  AdminLotteryInfoRankResponse,
} from '../../../../constants/ressources/admin/LotteryInfoRessource';
import { ApiAdmin } from '../../../../config/api-admin';

/**
 * Service pour récupérer les résultats des tirages.
 *
 * @class TirageResultService
 */
@Injectable({
  providedIn: 'root',
})
export class TirageResultService {
  private readonly http = inject(HttpClient);

  /**
   * Récupère le classement d'un tirage par son identifiant.
   *
   * @param {number} id - L'identifiant du tirage pour lequel récupérer le classement.
   * @returns {Observable<AdminLotteryInfoRankResponse>} - Un Observable contenant la réponse du classement.
   * @throws {AdminLotteryInfoRankError} - En cas d'erreur lors de la récupération du classement.
   */
  getRank(id: number): Observable<AdminLotteryInfoRankResponse> {
    return this.http
      .get<AdminLotteryInfoRankResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_RANK(id)}`,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: AdminLotteryInfoRankError = {
            errors: true,
            message:
              error.error?.message ||
              'Une erreur est survenu lors de la récupération du classement',
            details:
              error.error?.details ||
              'Une erreur est survenu lors de la récupération du classement',
          };
          return throwError(() => err);
        }),
      );
  }
}
