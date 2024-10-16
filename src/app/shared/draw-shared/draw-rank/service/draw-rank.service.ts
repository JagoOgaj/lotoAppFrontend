import { inject, Injectable } from '@angular/core';
import {
  LotteryInfoRankError,
  LotteryInfoRankResponse,
} from '../../../../constants/ressources/user/LotteryInfoRessource';
import { ApiUser } from '../../../../config/api-user';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Service pour interagir avec les tirages de loterie.
 *
 * Ce service fournit des méthodes pour récupérer le classement d'un tirage
 * et pour obtenir un PDF de récompense associé à un tirage spécifique.
 */
@Injectable({
  providedIn: 'root',
})
export class DrawRankService {
  private readonly http = inject(HttpClient);

  /**
   * Récupère le classement d'un tirage spécifique.
   *
   * Cette méthode envoie une requête HTTP GET à l'API pour récupérer les
   * informations de classement associées à un tirage identifié par son ID.
   *
   * @param {number} id - L'identifiant du tirage pour lequel le classement est requis.
   * @returns {Observable<LotteryInfoRankResponse>} - Un observable contenant la réponse avec les informations de classement.
   *
   * @throws {LotteryInfoRankError} - Une erreur si la requête échoue, incluant un message d'erreur et des détails.
   *
   * @example
   * drawRankService.getRankTirage(1).subscribe(response => {
   *   console.log(response);
   * }, error => {
   *   console.error(error.message);
   * });
   */
  getRankTirage(id: number): Observable<LotteryInfoRankResponse> {
    return this.http
      .get<LotteryInfoRankResponse>(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOTTERY_RANK(id)}`,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: LotteryInfoRankError = {
            errors: true,
            message:
              error.error?.message ||
              'Une erreur est survenue lors de la récupération du classement du tirage',
            details: error.error?.details,
          };
          return throwError(() => err);
        }),
      );
  }

  /**
   * Récupère le PDF de récompense pour un tirage spécifique.
   *
   * Cette méthode envoie une requête HTTP POST à l'API pour obtenir un PDF
   * de récompense associé à un tirage identifié par son ID.
   *
   * @param {number} tirageId - L'identifiant du tirage pour lequel le PDF de récompense est requis.
   * @returns {Observable<Blob>} - Un observable contenant le blob du PDF de récompense.
   *
   * @example
   * drawRankService.getRewardPdf(1).subscribe(blob => {
   *   const url = window.URL.createObjectURL(blob);
   *   const a = document.createElement('a');
   *   a.href = url;
   *   a.download = 'recompense.pdf';
   *   a.click();
   * }, error => {
   *   console.error('Erreur lors de la récupération du PDF', error);
   * });
   */
  getRewardPdf(tirageId: number): Observable<Blob> {
    return this.http.post(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.REWARD_PDF(tirageId)}`,
      {},
      {
        responseType: 'blob',
      },
    );
  }
}
