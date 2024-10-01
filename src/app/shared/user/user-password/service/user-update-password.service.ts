import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  UpdateInfoUserResponse,
  UpdatePasswordUser,
  UpdatePasswordUserError,
} from '../../../../constants/ressources/user/userInfoRessource';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiUser } from '../../../../config/api-user';

@Injectable({
  providedIn: 'root',
})
export class UserUpdatePasswordService {
  private readonly http = inject(HttpClient);

  updatePassword(data: UpdatePasswordUser): Observable<UpdateInfoUserResponse> {
    return this.http
      .put<UpdateInfoUserResponse>(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.UPDATE_PASSWORD}`,
        data,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const errorDetails = error.error?.details || {};

          const err: UpdatePasswordUserError = {
            errors: true,
            message:
              error.error?.message || 'Erreur de mise à jour du mot de passe',
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
