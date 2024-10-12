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

/**
 * Service pour gérer la liste des participants.
 */
@Injectable({
  providedIn: 'root',
})
export class ParticipantsListService {
  private readonly http = inject(HttpClient);

  /**
   * Supprime un participant de la liste.
   *
   * @param data - Les données nécessaires pour supprimer un participant.
   * @returns Un Observable de la réponse de suppression.
   */
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

  /**
   * Ajoute un participant à la liste.
   *
   * @param data - Les données nécessaires pour ajouter un participant.
   * @param id - L'identifiant de l'entité à laquelle le participant est ajouté.
   * @returns Un Observable de la réponse d'ajout.
   */
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

  /**
   * Remplit automatiquement un utilisateur fictif.
   *
   * @param id - L'identifiant de l'entité à laquelle l'utilisateur fictif est associé.
   * @returns Un Observable de la réponse pour le remplissage automatique.
   */
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
