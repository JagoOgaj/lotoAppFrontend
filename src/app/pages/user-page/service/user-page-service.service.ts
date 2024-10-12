import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  AccountInfoErrors,
  UserInfoRessource,
} from '../../../constants/ressources/user/userInfoRessource';
import { ApiUser } from '../../../config/api-user';
import {
  LogoutUserError,
  LogoutUserResponse,
} from '../../../constants/ressources/user/LogoutUserRessource';

/**
 * Service pour gérer les opérations liées à la page utilisateur.
 */
@Injectable({
  providedIn: 'root',
})
export class UserPageServiceService {
  private readonly http = inject(HttpClient);

  /**
   * Récupère les informations de l'utilisateur.
   * @returns Un observable contenant les informations de l'utilisateur.
   * En cas d'erreur, renvoie un objet d'erreur contenant un message et des détails.
   */
  getUserInfo(): Observable<UserInfoRessource> {
    return this.http
      .get<UserInfoRessource>(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.ACCOUNT_INFO}`,
        {
          headers: new HttpHeaders({ 'Conent-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: AccountInfoErrors = {
            errors: true,
            message:
              error.error?.message ||
              'Une erreur est survenue lors de la récupération des informations.',
            details: error.error?.details || {},
          };
          return throwError(err);
        }),
      );
  }

  /**
   * Déconnecte l'utilisateur.
   * @returns Un observable contenant la réponse de la déconnexion.
   * En cas d'erreur, renvoie un objet d'erreur contenant un message et des détails.
   */
  logoutUser(): Observable<LogoutUserResponse> {
    return this.http
      .post<LogoutUserResponse>(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOGOUT}`,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: LogoutUserError = {
            errors: true,
            message:
              error.error?.message ||
              'Une erreur est survenue lors de la déconnexion.',
            details:
              error.error?.details ||
              'Une erreur est survenue lors de la déconnexion.',
          };
          return throwError(() => err);
        }),
      );
  }
}
