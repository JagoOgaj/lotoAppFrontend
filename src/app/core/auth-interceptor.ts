import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiAdmin } from '../config/api-admin';
import { ApiAuth } from '../config/api-auth';
import { TokenExpirationGuard } from '../guards/tokenGuard/token-expiration.guard';
import { AuthService } from './service/auth.service';
import { ApiUser } from '../config/api-user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  );

  /**
   * Constructeur de la classe AuthInterceptor.
   * @param {AuthService} authService - Service d'authentification pour récupérer le token.
   * @param {Router} router - Router Angular pour naviguer entre les routes.
   * @param {TokenExpirationGuard} tokenExpirationGuard - Garde pour gérer l'expiration du token.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenExpirationGuard: TokenExpirationGuard,
  ) {}

  /**
   * Intercepte les requêtes HTTP et ajoute le token d'authentification si nécessaire.
   * @param {HttpRequest<any>} req - La requête HTTP à intercepter.
   * @param {HttpHandler} next - Le gestionnaire de requêtes HTTP suivant.
   * @returns {Observable<HttpEvent<any>>} Un observable de l'événement HTTP.
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    const isExcludedRequestToAddAuthToken = [
      ApiAuth.ENDPOINT.REVOKE_ACCESS,
      ApiAuth.ENDPOINT.REVOKE_REFRESH,
      ApiAuth.ENDPOINT.REFRESH,
      ApiAdmin.ENDPOINT.LOGIN,
      ApiUser.ENDPOINT.LOGIN,
    ].some((endpoint) => req.url.includes(endpoint));

    const isExcludedRequestToRefreshToken = [
      ApiAuth.ENDPOINT.REVOKE_ACCESS,
      ApiAuth.ENDPOINT.REVOKE_REFRESH,
      ApiAdmin.ENDPOINT.LOGIN,
      ApiUser.ENDPOINT.LOGIN,
    ].some((endpoint) => req.url.includes(endpoint));

    let authReq = req;

    if (authToken && !isExcludedRequestToAddAuthToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !isExcludedRequestToRefreshToken) {
          this.tokenExpirationGuard.enableAccess();
          this.router.navigate(['/token-expired']);
        }
        return throwError(error);
      }),
    );
  }
}
