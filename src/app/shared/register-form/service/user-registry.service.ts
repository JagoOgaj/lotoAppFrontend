import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  RegistryData,
  RegistryErrors,
  RegistryResponce,
} from '../../../constants/ressources/user/registryUserRessource';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiUser } from '../../../config/api-user';

/**
 * Service pour gérer l'enregistrement des utilisateurs.
 */
@Injectable({
  providedIn: 'root',
})
export class UserRegistryService {
  private readonly http = inject(HttpClient);

  /**
   * Enregistre un nouvel utilisateur.
   *
   * @param {RegistryData} data - Les données de l'utilisateur à enregistrer.
   * @returns {Observable<RegistryResponce>} - Un observable contenant la réponse de l'enregistrement.
   * @throws {RegistryErrors} - Renvoie un objet d'erreurs en cas d'échec.
   */
  registry(data: RegistryData): Observable<RegistryResponce> {
    return this.http
      .post<RegistryResponce>(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.REGISTER}`,
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

          const err: RegistryErrors = {
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
