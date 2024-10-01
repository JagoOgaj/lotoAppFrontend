import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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

  clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  logout(): void {
    const userRole = this.getUserRole();

    if (userRole) {
      this.revokeAccessToken().subscribe({
        next: () => {
          this.revokeRefreshToken().subscribe({
            next: () => {
              this.clearTokens();
              this.router.navigate(['/home']);
            },
            error: (err) => {
              console.error('Error revoking refresh token', err);
              this.clearTokens();
              this.router.navigate(['/home']);
            },
          });
        },
        error: (err) => {
          console.error('Error revoking access token', err);
          this.clearTokens();
          this.router.navigate(['/home']);
        },
      });
    } else {
      this.clearTokens();
      this.router.navigate(['/home']);
    }
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.USER_ROLE_KEY);
  }

  setUserRole(): void {
    this.http
      .get<RoleResponse>(`${ApiAuth.BASE_URL}${ApiAuth.ENDPOINT.GET_USER_ROLE}`)
      .subscribe({
        next: (response) => {
          localStorage.setItem(this.USER_ROLE_KEY, response.role);
        },
        error: (err) => {
          console.error('Error fetching user role', err);
        },
      });
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
    return this.http
      .delete(`${ApiAuth.BASE_URL}${ApiAuth.ENDPOINT.REVOKE_ACCESS}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
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
      return of(null);
    }

    return this.http
      .delete(`${ApiAuth.BASE_URL}${ApiAuth.ENDPOINT.REVOKE_REFRESH}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap(() => {
          this.clearTokens();
        }),
        catchError((error) => {
          console.error('Failed to revoke refresh token', error);
          return of(null);
        }),
      );
  }
}
