import { inject, Injectable } from '@angular/core';
import {
  LotteryInfoAdminErreur,
  LotteryInfoAdminResponse,
} from '../../../constants/ressources/admin/LotteryInfoRessource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiAdmin } from '../../../config/api-admin';
import { catchError, Observable, throwError } from 'rxjs';
import {
  AddWiningsNumber,
  UpdateLottery,
  UpdateLotteryError,
  UpdateLotteryResponse,
  UpdateLotteryToDoneErorr,
  UpdateLotteryToDoneResponse,
} from '../../../constants/ressources/admin/AdminUpdateLottery';

@Injectable({
  providedIn: 'root',
})
export class AdminSharedService {
  private readonly http = inject(HttpClient);

  getTirageDetails(id: number): Observable<LotteryInfoAdminResponse> {
    return this.http
      .get<LotteryInfoAdminResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_DETAILS(id)}`,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: LotteryInfoAdminErreur = {
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

  updateTirageToDone(
    id: number,
    data: AddWiningsNumber,
  ): Observable<UpdateLotteryToDoneResponse> {
    return this.http
      .post<UpdateLotteryToDoneResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_VALIDATE(id)}`,
        data,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
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
