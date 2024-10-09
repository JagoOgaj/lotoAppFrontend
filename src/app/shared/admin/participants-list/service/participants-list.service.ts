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
import {
  ParticipantsError,
  PopulateFakeUserResponse,
} from '../../../../constants/ressources/admin/AdminParticipantsRessource';

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

  populateFakeUser(id: number): Observable<PopulateFakeUserResponse> {
    return this.http
      .post<PopulateFakeUserResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.POPULATE_FAKE_USER(id)}`,
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
              'Une erreur est survenu lors du remplissage automatique du tirage',
            details:
              error.error?.details ||
              'Une erreur est survenu lors du remplissage automatique du tirage',
          };
          return throwError(() => err);
        }),
      );
  }
}
