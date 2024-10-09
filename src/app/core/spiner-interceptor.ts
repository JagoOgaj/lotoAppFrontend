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
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // Affiche le spinner avec la couleur jaune pour Pacman
    this.spinner.show(undefined, {
      type: 'pacman',
      bdColor: 'rgba(0,0,0,0.8)', // Optionnel : couleur d'arrière-plan semi-transparente
      color: 'yellow', // Couleur du Pacman
      size: 'large', // Taille du spinner
    });

    return next.handle(req).pipe(
      // Vérifie les réponses HTTP
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Vérifie si la réponse contient un attribut `errors` à true
          if (event.body && event.body.errors) {
            this.toastr.error(
              event.body.message || 'Une erreur est survenue',
              'Erreur',
            );
          } else {
            // Si pas d'erreurs, on affiche un message de succès
            this.toastr.success(
              event.body.message || 'La requete a aboutie',
              'Succès',
            );
          }
        }
        return event;
      }),

      // Gère les erreurs renvoyées par le serveur
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue, réessayer plus tard'; // Message par défaut

        // Gérer les différents codes d'erreur
        switch (error.status) {
          case 400:
            // Afficher un toast d'information pour le code d'erreur 400
            this.toastr.info(
              error.error?.message || 'Ressource non trouvé.',
              'Informations',
            );
            break;
          case 404:
            // Afficher un toast d'erreur pour le code d'erreur 404
            this.toastr.error(
              error.error?.message || 'Requête incorrecte.',
              'Erreur 404',
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

        return throwError(error); // Retourne l'erreur pour un traitement ultérieur
      }),

      // Finalise en cachant le spinner
      finalize(() => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000); // Délai d'une seconde avant de cacher le spinner
      }),
    );
  }
}
