import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiAdmin } from '../../../../config/api-admin';
import {
  AddParticipantRessource,
  AddParticipantsError,
  AddParticipantsResponse,
  ManageRemoveParticipant,
  RemoveParticipantError,
  RemoveParticipantResponse,
} from '../../../../constants/ressources/admin/AdminManageParticipantsRessource';

@Injectable({
  providedIn: 'root',
})
export class ParticipantsListService {
  private readonly http = inject(HttpClient);

  removeParticipant(
    data: ManageRemoveParticipant,
  ): Observable<RemoveParticipantResponse> {
    return this.http
      .delete<RemoveParticipantResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.MANAGE_PARTICIPANTS_REMOVE}`,
        {
          body: data,
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: RemoveParticipantError = {
            errors: true,
            message:
              error.error?.message ||
              "Erreur dans la supression de l'utilisateur",
            details:
              error.error?.details ||
              "Erreur dans la supression de l'utilisateur",
          };
          return throwError(() => err);
        }),
      );
  }

  addParticipant(
    data: AddParticipantRessource,
    id: number,
  ): Observable<AddParticipantsResponse> {
    return this.http
      .put<AddParticipantsResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.MANAGE_PARTICIPANTS_ADD(id)}`,
        data,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const erroDetails = error.error?.details || {};

          const err: AddParticipantsError = {
            errors: true,
            message:
              error.error?.message ||
              "Une erreur est survenu dans l'ajout d'un utilisateur",
            details: {
              numbers: erroDetails.numbers || null,
              lucky_numbers: erroDetails.lucky_numbers || null,
              email: erroDetails.email || null,
              user_name: erroDetails.user_name || null,
            },
          };
          return throwError(() => err);
        }),
      );
  }
}
