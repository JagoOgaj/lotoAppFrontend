import { inject, Injectable } from '@angular/core';
import { ApiUser } from '../../../config/api-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {
  LoginData,
  LoginErrors,
  LoginResponse,
} from '../../../constants/ressources/user/LoginUserRessource';

/**
 * Service pour la gestion de la connexion des utilisateurs.
 * @service
 */
@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  private readonly http = inject(HttpClient);

  /**
   * Effectue la connexion d'un utilisateur.
   * @param {LoginData} data - Les données de connexion de l'utilisateur.
   * @returns {Observable<LoginResponse>} - Un Observable qui renvoie la réponse de connexion.
   * @throws {LoginErrors} - Erreurs pouvant survenir lors de la connexion.
   */
  login(data: LoginData): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOGIN}`,
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

          const err: LoginErrors = {
            errors: true,
            message: error.error?.message || 'Erreur de connexion',
            details: {
              emailError: details.email ? details.email[0] : null,
              passwordError: details.password ? details.password[0] : null,
            },
          };
          return throwError(err);
        }),
      );
  }
}
