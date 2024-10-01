import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  LotteryRegistryData,
  LotteryRegistryError,
  LotteryRegistryResponse,
} from '../../../constants/ressources/user/LotteryRegistryRessource';
import { ApiUser } from '../../../config/api-user';

@Injectable({
  providedIn: 'root',
})
export class LottoryFormService {
  private readonly http = inject(HttpClient);

  registryToLottery(
    data: LotteryRegistryData,
  ): Observable<LotteryRegistryResponse> {
    return this.http
      .post<LotteryRegistryResponse>(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOTTERY_REGISTRY}`,
        data,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const errorDetails = error.error?.details || {};
          const err: LotteryRegistryError = {
            message: error.error?.message,
            errors: true,
            details: {
              lucky_numbers: errorDetails.lucky_numbers || null,
              numbers: errorDetails.numbers || null,
            },
          };
          return throwError(() => err);
        }),
      );
  }
}
