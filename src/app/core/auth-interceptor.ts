import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    let authReq = req;
    if (authToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (this.isRefreshing) {
            return this.refreshTokenSubject.pipe(
              filter((token) => token != null),
              take(1),
              switchMap((newToken: string) => {
                authReq = this.addToken(req, newToken);
                return next.handle(authReq);
              }),
            );
          } else {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
              switchMap((newToken: string) => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(newToken);
                authReq = this.addToken(req, newToken);
                return next.handle(authReq);
              }),
              catchError((err) => {
                this.isRefreshing = false;
                this.authService.logout();
                this.toastr.error(
                  'Échec du rafraîchissement du token, vous serez déconnecté.',
                  'Erreur',
                );
                return throwError(err);
              }),
            );
          }
        }
        return throwError(error);
      }),
    );
  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
