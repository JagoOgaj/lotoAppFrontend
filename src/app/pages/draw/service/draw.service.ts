import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  LotteryInfoErreur,
  LotteryInfoRankError,
  LotteryInfoRankResponse,
  LotteryInfoResponse,
} from '../../../constants/ressources/user/LotteryInfoRessource';
import { ApiUser } from '../../../config/api-user';

@Injectable({
  providedIn: 'root',
})
export class DrawService {
  private readonly http = inject(HttpClient);

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
