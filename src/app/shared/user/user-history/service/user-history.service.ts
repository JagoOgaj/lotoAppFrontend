import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  LotteryHistoryErrors,
  LotteryHistoryResonse,
} from '../../../../constants/ressources/user/tirageUserRessource';
import { ApiUser } from '../../../../config/api-user';

@Injectable({
  providedIn: 'root',
})
export class UserHistoryService {
  private readonly http = inject(HttpClient);

  getHistory(): Observable<LotteryHistoryResonse> {
    return this.http
      .get<LotteryHistoryResonse>(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOTTERY_HISTORY}`,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          let errorResponse: LotteryHistoryErrors = {
            message:
              'Une erreur est survenue lors de la récupération de l’historique.',
            errors: true,
          };

          if (error.error && error.error.message) {
            errorResponse.message = error.error.message;
          }
          if (error.error && error.error.emptyEntries) {
            errorResponse.emptyEntries = true;
          }

          if (error.error && error.error.details) {
            errorResponse.details = error.error.details;
          }
          return throwError(() => errorResponse);
        }),
      );
  }
}
