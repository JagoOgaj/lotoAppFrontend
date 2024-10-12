import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  UpdateInfoUser,
  UpdateInfoUserResponse,
  UpdateInfoUserResponseError,
} from '../../../../constants/ressources/user/userInfoRessource';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiUser } from '../../../../config/api-user';

/**
 * Service pour mettre à jour les informations de l'utilisateur.
 */
@Injectable({
  providedIn: 'root',
})
export class UserUpdateService {
  private readonly http = inject(HttpClient);

  /**
   * Met à jour les informations de l'utilisateur.
   *
   * @param {UpdateInfoUser} data - Les données de mise à jour de l'utilisateur.
   * @returns {Observable<UpdateInfoUserResponse>} - Un observable qui renvoie la réponse de la mise à jour.
   *
   * @throws {UpdateInfoUserResponseError} - Renvoie une erreur si la mise à jour échoue.
   */
  updateInfo(data: UpdateInfoUser): Observable<UpdateInfoUserResponse> {
    return this.http
      .put<UpdateInfoUserResponse>(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.UPDATE_INFO}`,
        data,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const details =
            error.error && typeof error.error.details === 'object'
              ? error.error.details
              : {};

          const err: UpdateInfoUserResponseError = {
            errors: true,
            message:
              error.error?.message || "Erreur de création de l'utilisateur",
            details: {
              first_name: details.first_name || null,
              last_name: details.last_name || null,
              email: details.email || null,
              password: details.password || null,
            },
          };
          return throwError(err);
        }),
      );
  }
}
