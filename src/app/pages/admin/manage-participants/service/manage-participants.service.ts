import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  ParticipantsError,
  ParticipantsResponse,
} from '../../../../constants/ressources/admin/AdminParticipantsRessource';
import { ApiAdmin } from '../../../../config/api-admin';

@Injectable({
  providedIn: 'root',
})
export class ManageParticipantsService {
  private readonly http = inject(HttpClient);

  getParticipants(id: number): Observable<ParticipantsResponse> {
    return this.http
      .get<ParticipantsResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.PARTICIPANTS_LIST(id)}`,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: ParticipantsError = {
            erros: true,
            message:
              error.error?.message ||
              'Une erreur est survenue lors de la récupération des participants',
            details:
              error.error?.details ||
              'Une erreur est survenue lors de la récupération des participants',
          };
          return throwError(() => err);
        }),
      );
  }
}
