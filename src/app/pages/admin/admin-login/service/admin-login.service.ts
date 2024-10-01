import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  LoginAdminData,
  LoginAdminErrors,
  LoginAdminResponse,
} from '../../../../constants/ressources/admin/AdminLoginRessource';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiUser } from '../../../../config/api-user';
import { ApiAdmin } from '../../../../config/api-admin';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {
  private readonly http = inject(HttpClient);

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
