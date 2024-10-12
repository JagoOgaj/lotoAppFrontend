import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  AllLotteryError,
  AllLotteryResponse,
} from '../../../../constants/ressources/admin/LotteryInfoRessource';
import { ApiAdmin } from '../../../../config/api-admin';

/**
 * Service pour gérer la récupération des listes de tirages.
 *
 * @service
 * @module TirageListService
 */
@Injectable({
  providedIn: 'root',
})
export class TirageListService {
  private readonly http = inject(HttpClient);

  /**
   * Récupère la liste de tous les tirages.
   *
   * Effectue une requête HTTP GET vers l'API pour obtenir la liste des tirages.
   * En cas d'erreur, renvoie un objet d'erreur personnalisé contenant les détails de l'erreur.
   *
   * @returns {Observable<AllLotteryResponse>} Un observable contenant la réponse de l'API
   * @throws {AllLotteryError} Lève une erreur personnalisée en cas d'échec de la requête.
   */
  getTirageList(): Observable<AllLotteryResponse> {
    return this.http
      .get<AllLotteryResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_LIST}`,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: AllLotteryError = {
            errors: true,
            message:
              error.error?.mesasge ||
              'Une erreur est survenue lors de la récupération de tous les tirages',
            details:
              error.error?.details ||
              'Une erreur est survenue lors de la récupération de tous les tirages',
          };
          return throwError(() => err);
        }),
      );
  }
}
