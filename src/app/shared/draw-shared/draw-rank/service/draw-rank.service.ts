import { inject, Injectable } from '@angular/core';
import {
  LotteryInfoRankError,
  LotteryInfoRankResponse,
} from '../../../../constants/ressources/user/LotteryInfoRessource';
import { ApiUser } from '../../../../config/api-user';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DrawRankService {
  private readonly http = inject(HttpClient);
  constructor() {}

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
}
