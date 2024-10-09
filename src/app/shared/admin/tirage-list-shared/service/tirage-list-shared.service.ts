import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  CreateTirageError,
  CreateTirageResponse,
  CreateTirageRessource,
  DeleteTirageError,
  DeleteTirageResponse,
} from '../../../../constants/ressources/admin/AdminCreateDeleteTirageRessource';
import { ApiAdmin } from '../../../../config/api-admin';

@Injectable({
  providedIn: 'root',
})
export class TirageListSharedService {
  private readonly http = inject(HttpClient);

  createTirage(data: CreateTirageRessource): Observable<CreateTirageResponse> {
    return this.http
      .post<CreateTirageResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.CREATE_LOTTERY}`,
        data,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const errorDetails = error.error?.details || {};
          const err: CreateTirageError = {
            errors: true,
            message:
              error.error?.message ||
              'Une erreur est survenue lors de la création du tirage',
            details: {
              name: errorDetails.name || null,
              status: errorDetails.status || null,
              max_participants: errorDetails.max_participants || null,
              reward_price: errorDetails.reward_price || null,
              start_date: errorDetails.start_date || null,
              end_date: errorDetails.end_date || null,
            },
          };
          return throwError(() => err);
        }),
      );
  }

  deleteTirage(id: number): Observable<DeleteTirageResponse> {
    return this.http
      .delete<DeleteTirageResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.DELETE_LOTTERY(id)}`,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: DeleteTirageError = {
            errors: true,
            message:
              error.error?.message ||
              'Une erreur est survenu lors de la supression du tirage',
            details:
              error.error?.details ||
              'Une erreur est survenu lors de la supression',
          };
          return throwError(() => err);
        }),
      );
  }
}
