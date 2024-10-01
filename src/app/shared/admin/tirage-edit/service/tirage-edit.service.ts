import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  UpdateLottery,
  UpdateLotteryError,
  UpdateLotteryResponse,
  UpdateLotteryToDoneErorr,
  UpdateLotteryToDoneResponse,
} from '../../../../constants/ressources/admin/AdminUpdateLottery';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiAdmin } from '../../../../config/api-admin';
import { Header } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class TirageEditService {
  private readonly http = inject(HttpClient);

  updateTirage(
    id: number,
    data: UpdateLottery,
  ): Observable<UpdateLotteryResponse> {
    return this.http
      .put<UpdateLotteryResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_UPDATE(id)}`,
        data,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const errorDetails = error.error?.details || {};

          const err: UpdateLotteryError = {
            errors: true,
            message:
              error.error?.message || 'Erreur lors de la mise à jour du tirage',
            details: {
              name: errorDetails.name || null,
              start_date: errorDetails.start_date || null,
              end_date: errorDetails.end_date || null,
              status: errorDetails.status || null,
              max_participants: errorDetails.max_participants || null,
            },
          };
          return throwError(() => err);
        }),
      );
  }

  updateTirageToDone(id: number): Observable<UpdateLotteryToDoneResponse> {
    return this.http
      .post<UpdateLotteryToDoneResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_VALIDATE(id)}`,
        {
          Headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: UpdateLotteryToDoneErorr = {
            errors: true,
            message:
              error.error?.message ||
              'Une erreur est survenue lors du changement de status.',
            details:
              error.error?.details ||
              'Une erreur est survenue lors du changement de status.',
          };
          return throwError(() => err);
        }),
      );
  }
}
