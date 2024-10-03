import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  AdminLotteryInfoRankError,
  AdminLotteryInfoRankResponse,
} from '../../../../constants/ressources/admin/LotteryInfoRessource';
import { ApiUser } from '../../../../config/api-user';
import { ApiAdmin } from '../../../../config/api-admin';

@Injectable({
  providedIn: 'root',
})
export class TirageResultService {
  private readonly http = inject(HttpClient);

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
