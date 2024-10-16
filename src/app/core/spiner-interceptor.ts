import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  /**
   * Constructeur de l'intercepteur HTTP.
   * @param {NgxSpinnerService} spinner - Service pour afficher un spinner de chargement.
   * @param {ToastrService} toastr - Service pour afficher des notifications toast.
   */
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {}

  /**
   * Intercepte les requêtes HTTP et gère les réponses et les erreurs.
   * @param {HttpRequest<any>} req - La requête HTTP à intercepter.
   * @param {HttpHandler} next - Le gestionnaire de requêtes HTTP suivant.
   * @returns {Observable<HttpEvent<any>>} Un observable de l'événement HTTP.
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.spinner.show(undefined, {
      type: 'ball-fussion',
      bdColor: 'rgba(0,0,0,0.85)',
      color: 'white',
      size: 'large',
    });

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.errors) {
            this.toastr.error(
              event.body.message || 'Une erreur est survenue',
              'Erreur',
            );
          } else {
            this.toastr.success(
              event.body.message || 'La requête a abouti',
              'Succès',
            );
          }
        }
        return event;
      }),

      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue, réessayer plus tard';

        switch (error.status) {
          case 400:
            this.toastr.info(
              error.error?.message || 'Ressource non trouvée.',
              'Informations',
            );
            break;
          case 404:
            this.toastr.error(
              error.error?.message || 'Requête incorrecte.',
              'Erreur',
            );
            break;
          case 0:
            errorMessage = 'Impossible de se connecter au serveur';
            break;
          default:
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            }
        }

        return throwError(error);
      }),

      finalize(() => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1500);
      }),
    );
  }
}
