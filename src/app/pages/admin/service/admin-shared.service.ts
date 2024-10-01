import { inject, Injectable } from '@angular/core';
import {
  LotteryInfoAdminErreur,
  LotteryInfoAdminResponse,
} from '../../../constants/ressources/admin/LotteryInfoRessource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiAdmin } from '../../../config/api-admin';
import { catchError, Observable, throwError } from 'rxjs';

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
}
