import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  AdminInfoErrors,
  AdminInfoResponse,
  AdminLogoutError,
  AdminLogoutResponse,
} from '../../../../constants/ressources/admin/AdminInfoRessource';
import { ApiAdmin } from '../../../../config/api-admin';

@Injectable({
  providedIn: 'root',
})
export class AcountAdminService {
  private readonly http = inject(HttpClient);

  getAdminInfo(): Observable<AdminInfoResponse> {
    return this.http
      .get<AdminInfoResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.ACCOUNT_INFO}`,
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
          const err: AdminInfoErrors = {
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
          return throwError(() => err);
        }),
      );
  }

  logout(): Observable<AdminLogoutResponse> {
    return this.http
      .post<AdminLogoutResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOGOUT}`,
        {
          Header: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: AdminLogoutError = {
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
