import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ApiAuth } from '../../config/api-auth';
import { RoleResponse } from '../../constants/ressources/auth/RoleRessource';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_ROLE_KEY = 'userRole';
  private readonly http = inject(HttpClient);
  private isRevoking: boolean = false;

  /**
   * Récupère le token d'accès stocké dans le local storage.
   * @returns {string | null} Le token d'accès ou null si non trouvé.
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Récupère le refresh token stocké dans le local storage.
   * @returns {string | null} Le refresh token ou null si non trouvé.
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Stocke les tokens d'accès et de rafraîchissement dans le local storage.
   * @param {string} accessToken - Le token d'accès à stocker.
   * @param {string} refreshToken - Le refresh token à stocker.
   */
  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  /**
   * Stocke uniquement le token d'accès dans le local storage.
   * @param {string} accessToken - Le token d'accès à stocker.
   */
  setAccesToken(accessToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, accessToken);
  }

  /**
   * Supprime les tokens d'accès et de rafraîchissement du local storage.
   */
  clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Déconnexion de l'utilisateur, en révoquant les tokens d'accès et de rafraîchissement.
   * @returns {Observable<any>} Un observable qui émettra les résultats de la révocation.
   */
  logout(): Observable<any> {
    const userRole = this.getUserRole();

    if (userRole) {
      if (this.isRevoking) {
        return of(null);
      }

      this.isRevoking = true;

      return forkJoin({
        access: this.revokeAccessToken().pipe(
          catchError((err) => {
            return of(null);
          }),
        ),
        refresh: this.revokeRefreshToken().pipe(
          catchError((err) => {
            return of(null);
          }),
        ),
      }).pipe(
        tap(() => {
          this.clearUserRole();
        }),
        finalize(() => {
          this.isRevoking = false;
        }),
      );
    }

    return of(null);
  }

  /**
   * Récupère le rôle de l'utilisateur stocké dans le local storage.
   * @returns {string | null} Le rôle de l'utilisateur ou null si non trouvé.
   */
  getUserRole(): string | null {
    return localStorage.getItem(this.USER_ROLE_KEY);
  }

  /**
   * Supprime le rôle de l'utilisateur du local storage.
   */
  clearUserRole(): void {
    localStorage.removeItem(this.USER_ROLE_KEY);
  }

  /**
   * Récupère le rôle de l'utilisateur en effectuant une requête HTTP.
   * @returns {Observable<RoleResponse>} Un observable qui émet le rôle de l'utilisateur.
   */
  setUserRole(): Observable<RoleResponse> {
    return this.http
      .get<RoleResponse>(`${ApiAuth.BASE_URL}${ApiAuth.ENDPOINT.GET_USER_ROLE}`)
      .pipe(
        tap((response) => {
          localStorage.setItem(this.USER_ROLE_KEY, response.role);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  /**
   * Vérifie si l'utilisateur est authentifié en fonction de la présence du token.
   * @returns {boolean} True si l'utilisateur est authentifié, sinon false.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Rafraîchit le token d'accès en utilisant le refresh token.
   * @returns {Observable<any>} Un observable qui émet le nouveau token d'accès ou null en cas d'échec.
   */
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return of(null);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${refreshToken}`,
    });

    return this.http
      .post(`${ApiAuth.BASE_URL}${ApiAuth.ENDPOINT.REFRESH}`, {}, { headers })
      .pipe(
        tap((response: any) => {
          if (response && response.access_token) {
            this.setTokens(response.access_token, refreshToken);
          }
        }),
        catchError((error) => {
          this.logout();
          return of(null);
        }),
      );
  }

  /**
   * Révoque le token d'accès en effectuant une requête HTTP DELETE.
   * @returns {Observable<any>} Un observable qui émet le résultat de la révocation.
   */
  revokeAccessToken(): Observable<any> {
    const token = this.getToken();

    if (!token) {
      return of(null);
    }

    if (this.isRevoking) {
      return of(null);
    }

    return this.http
      .delete(`${ApiAuth.BASE_URL}${ApiAuth.ENDPOINT.REVOKE_ACCESS}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        tap(() => {
          this.clearTokens();
        }),
        catchError((error) => {
          return of(null);
        }),
      );
  }

  /**
   * Révoque le refresh token en effectuant une requête HTTP DELETE.
   * @returns {Observable<any>} Un observable qui émet le résultat de la révocation.
   */
  revokeRefreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return of(null);
    }

    return this.http
      .delete(`${ApiAuth.BASE_URL}${ApiAuth.ENDPOINT.REVOKE_REFRESH}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        }),
      })
      .pipe(
        tap(() => {
          this.clearTokens();
        }),
        catchError((error) => {
          return of(null);
        }),
      );
  }
}
