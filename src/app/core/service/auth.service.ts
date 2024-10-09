import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import {
  RoleResponse,
  Roles,
} from '../../constants/ressources/auth/RoleRessource';
import { ApiAuth } from '../../config/api-auth';

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

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  setAccesToken(accessToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, accessToken);
  }

  clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  logout(): Observable<any> {
    const userRole = this.getUserRole();

    if (userRole) {
      // Ajoutez une vérification pour éviter les appels multiples
      if (this.isRevoking) {
        console.warn('Revocation already in progress.');
        return of(null); // Retournez un Observable vide
      }

      this.isRevoking = true; // Marquer que la révocation est en cours

      // Utilisation de `forkJoin` pour effectuer les deux appels simultanément
      return forkJoin({
        access: this.revokeAccessToken().pipe(
          catchError((err) => {
            console.error('Error revoking access token', err);
            return of(null); // Gérer l'erreur en continuant
          }),
        ),
        refresh: this.revokeRefreshToken().pipe(
          catchError((err) => {
            console.error('Error revoking refresh token', err);
            return of(null); // Gérer l'erreur en continuant
          }),
        ),
      }).pipe(
        tap(() => {
          this.clearUserRole(); // Effacer également le rôle utilisateur
        }),
        finalize(() => {
          this.isRevoking = false; // Réinitialiser l'état à la fin
        }),
      );
    }

    return of(null);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.USER_ROLE_KEY);
  }

  clearUserRole(): void {
    localStorage.removeItem(this.USER_ROLE_KEY);
  }

  setUserRole(): Observable<RoleResponse> {
    return this.http
      .get<RoleResponse>(`${ApiAuth.BASE_URL}${ApiAuth.ENDPOINT.GET_USER_ROLE}`)
      .pipe(
        tap((response) => {
          localStorage.setItem(this.USER_ROLE_KEY, response.role);
        }),
        catchError((err) => {
          console.error('Error fetching user role', err);
          return throwError(err);
        }),
      );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

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
          console.error('Failed to refresh token', error);
          this.logout();
          return of(null);
        }),
      );
  }

  revokeAccessToken(): Observable<any> {
    const token = this.getToken(); // Récupérer le token JWT actuel

    // Vérifier si le token est null ou vide
    if (!token) {
      console.error('No access token available for revocation.');
      return of(null); // Retourner un observable avec une valeur nulle
    }

    if (this.isRevoking) {
      console.warn('Revocation already in progress.');
      return of(null); // Retournez un Observable vide
    }

    return this.http
      .delete(`${ApiAuth.BASE_URL}${ApiAuth.ENDPOINT.REVOKE_ACCESS}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Inclure le token d'authentification si nécessaire
        }),
      })
      .pipe(
        tap(() => {
          this.clearTokens();
        }),
        catchError((error) => {
          console.error('Failed to revoke access token', error);
          return of(null);
        }),
      );
  }

  revokeRefreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      console.error('No refresh token available for revocation.');
      return of(null); // Retourner un observable avec une valeur nulle
    }

    // Envoi du refresh token dans les headers d'authentification
    return this.http
      .delete(`${ApiAuth.BASE_URL}${ApiAuth.ENDPOINT.REVOKE_REFRESH}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`, // Inclure le refresh token dans les headers
        }),
      })
      .pipe(
        tap(() => {
          this.clearTokens(); // Effacer les tokens après la révocation
        }),
        catchError((error) => {
          console.error('Failed to revoke refresh token', error);
          return of(null);
        }),
      );
  }
}
