import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  UpdateInfoAdminResponse,
  UpdatePasswordAdmin,
  UpdatePasswordUAdminError,
} from '../../../../constants/ressources/admin/AdminUpdateInfoRessource';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiAdmin } from '../../../../config/api-admin';

/**
 * Service pour la gestion des opérations liées à l'administration des mots de passe.
 */
@Injectable({
  providedIn: 'root',
})
export class AdminPwdService {
  private readonly http = inject(HttpClient);

  /**
   * Met à jour le mot de passe d'un administrateur.
   *
   * @param data - Les données nécessaires pour mettre à jour le mot de passe de l'administrateur.
   * @returns Un observable qui émet une réponse indiquant le résultat de l'opération de mise à jour du mot de passe.
   * @throws {UpdatePasswordUAdminError} En cas d'erreur lors de la mise à jour du mot de passe.
   */
  updatePasswordAdmin(
    data: UpdatePasswordAdmin,
  ): Observable<UpdateInfoAdminResponse> {
    return this.http
      .put<UpdateInfoAdminResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.UPDATE_PASSWORD}`,
        data,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const errorDetails = error.error?.details || {};

          const err: UpdatePasswordUAdminError = {
            errors: true,
            message:
              error.error?.message || 'Erreur de mise à jour de mot de passe',
            details: {
              password: errorDetails.password || null,
              new_password: errorDetails.new_password || null,
            },
          };
          return throwError(() => err);
        }),
      );
  }
}
