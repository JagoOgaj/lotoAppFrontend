import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ContactUsErrors,
  ContactUsResponse,
  ContactUsRessource,
} from '../../../constants/ressources/contact/ContactUsRessource';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiContact } from '../../../config/api-contact';

/**
 * Service pour gérer l'envoi de messages via le formulaire de contact.
 *
 * @service
 */
@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  private http = inject(HttpClient);

  /**
   * Envoie un message via le formulaire de contact.
   *
   * @param {ContactUsRessource} data - Les données du message à envoyer.
   * @returns {Observable<ContactUsResponse>} - Un observable contenant la réponse du serveur.
   *
   * @throws {ContactUsErrors} - En cas d'erreur lors de l'envoi.
   */
  sendMessgage(data: ContactUsRessource): Observable<ContactUsResponse> {
    return this.http
      .post<ContactUsResponse>(
        `${ApiContact.BASE_URL}${ApiContact.ENDPOINT.CONTACT_US}`,
        data,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: ContactUsErrors = {
            message: error.error.message,
            errors: error.error.erros,
            details: error.error.details,
          };
          return throwError(() => err);
        }),
      );
  }
}
