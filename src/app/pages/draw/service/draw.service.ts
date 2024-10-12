import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiUser } from '../../../config/api-user';
import {
  LotteryInfoErreur,
  LotteryInfoResponse,
} from '../../../constants/ressources/user/LotteryInfoRessource';

/**
 * Service pour interagir avec les opérations de tirage de loterie.
 * @class DrawService
 */
@Injectable({
  providedIn: 'root',
})
export class DrawService {
  private readonly http = inject(HttpClient);

  /**
   * Récupère les informations de détail d'un tirage de loterie par son ID.
   * @param {number} id - L'ID du tirage de loterie à récupérer.
   * @returns {Observable<LotteryInfoResponse>} - Un Observable contenant les détails du tirage.
   * @throws {LotteryInfoErreur} - En cas d'erreur lors de la récupération des informations.
   */
  getTirageOverview(id: number): Observable<LotteryInfoResponse> {
    return this.http
      .get<LotteryInfoResponse>(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOTTERY_DETAILS(id)}`,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: LotteryInfoErreur = {
            errors: true,
            message:
              error.error?.message ||
              'Une erreur est survenue lors de la récupération des informations du tirage',
            details: error.error?.details,
          };
          return throwError(() => err);
        }),
      );
  }
}
