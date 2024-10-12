import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  LoginAdminData,
  LoginAdminErrors,
  LoginAdminResponse,
} from '../../../../constants/ressources/admin/AdminLoginRessource';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiAdmin } from '../../../../config/api-admin';

/**
 * Service pour la gestion des connexions des administrateurs.
 *
 * @class AdminLoginService
 * @injectable
 */
@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {
  /** Instance de HttpClient injectée pour effectuer des requêtes HTTP. */
  private readonly http = inject(HttpClient);

  /**
   * Authentifie un administrateur avec les données fournies.
   *
   * @param {LoginAdminData} data - Les données de connexion de l'administrateur.
   * @returns {Observable<LoginAdminResponse>} - Un observable contenant la réponse de connexion.
   *
   * @throws {LoginAdminErrors} - Renvoie une erreur en cas d'échec de connexion.
   */
  loginAdmin(data: LoginAdminData): Observable<LoginAdminResponse> {
    return this.http
      .post<LoginAdminResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOGIN}`,
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

          const err: LoginAdminErrors = {
            errors: true,
            message: error.error?.message || 'Erreur de connexion',
            details: {
              emailError: details.email ? details.email[0] : null,
              passwordError: details.password ? details.password[0] : null,
            },
          };
          return throwError(() => err);
        }),
      );
  }
}
