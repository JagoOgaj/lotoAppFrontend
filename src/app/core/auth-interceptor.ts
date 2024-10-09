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

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenExpirationGuard: TokenExpirationGuard,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    // Exclure certaines requêtes (comme les connexions et les requêtes de refresh/revocation)
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

    // N'ajouter le token que si ce n'est pas une requête exclue
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
