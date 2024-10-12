import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  CreateTirageError,
  CreateTirageResponse,
  CreateTirageRessource,
  DeleteTirageError,
  DeleteTirageResponse,
} from '../../../../constants/ressources/admin/AdminCreateDeleteTirageRessource';
import { ApiAdmin } from '../../../../config/api-admin';
/**
 * Service partagé pour gérer les opérations liées aux tirages.
 *
 * @service TirageListSharedService
 * @description Ce service fournit des méthodes pour créer et supprimer des tirages
 * à l'aide de requêtes HTTP.
 *
 * @module TirageListSharedService
 * @injectable
 */
@Injectable({
  providedIn: 'root',
})
export class TirageListSharedService {
  private readonly http = inject(HttpClient);

  /**
   * Crée un tirage avec les données fournies.
   *
   * @param {CreateTirageRessource} data - Les données nécessaires pour créer un tirage.
   * @returns {Observable<CreateTirageResponse>} - Un observable contenant la réponse de création du tirage.
   * @throws {CreateTirageError} - En cas d'erreur lors de la création du tirage.
   */
  createTirage(data: CreateTirageRessource): Observable<CreateTirageResponse> {
    return this.http
      .post<CreateTirageResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.CREATE_LOTTERY}`,
        data,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const errorDetails = error.error?.details || {};
          const err: CreateTirageError = {
            errors: true,
            message:
              error.error?.message ||
              'Une erreur est survenue lors de la création du tirage',
            details: {
              name: errorDetails.name || null,
              status: errorDetails.status || null,
              max_participants: errorDetails.max_participants || null,
              reward_price: errorDetails.reward_price || null,
              start_date: errorDetails.start_date || null,
              end_date: errorDetails.end_date || null,
            },
          };
          return throwError(() => err);
        }),
      );
  }

  /**
   * Supprime un tirage en fonction de son ID.
   *
   * @param {number} id - L'ID du tirage à supprimer.
   * @returns {Observable<DeleteTirageResponse>} - Un observable contenant la réponse de suppression du tirage.
   * @throws {DeleteTirageError} - En cas d'erreur lors de la suppression du tirage.
   */
  deleteTirage(id: number): Observable<DeleteTirageResponse> {
    return this.http
      .delete<DeleteTirageResponse>(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.DELETE_LOTTERY(id)}`,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: DeleteTirageError = {
            errors: true,
            message:
              error.error?.message ||
              'Une erreur est survenu lors de la supression du tirage',
            details:
              error.error?.details ||
              'Une erreur est survenu lors de la supression',
          };
          return throwError(() => err);
        }),
      );
  }
}
