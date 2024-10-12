import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiAdmin } from '../../../../config/api-admin';
import {
  UpdateInfoAdmin,
  UpdateInfoAdminResponse,
  UpdateInfoAdminResponseError,
} from '../../../../constants/ressources/admin/AdminUpdateInfoRessource';

/**
 * Service pour la gestion des informations administratives.
 */
@Injectable({
  providedIn: 'root',
})
export class AdminInfoService {
  private readonly http = inject(HttpClient);

  /**
   * Met à jour les informations de l'administrateur.
   *
   * @param {UpdateInfoAdmin} data - Les nouvelles informations de l'administrateur à mettre à jour.
   * @returns {Observable<UpdateInfoAdminResponse>} - Un observable contenant la réponse de la mise à jour.
   * @throws {UpdateInfoAdminResponseError} - En cas d'erreur lors de la mise à jour des informations.
   */
  updateAdminInfo(data: UpdateInfoAdmin): Observable<UpdateInfoAdminResponse> {
    return this.http
      .put<UpdateInfoAdminResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.UPDATE_INFO}`,
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

          const err: UpdateInfoAdminResponseError = {
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
