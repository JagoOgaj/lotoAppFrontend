import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { ApiUser } from '../../../../config/api-user';
import {
  LotteryOverviewError,
  LotteryOverviewResponse,
} from '../../../../constants/ressources/user/tirageUserRessource';
import { UserSharedService } from '../../service/user-shared.service';

@Injectable({
  providedIn: 'root',
})
export class UserPlayServiceService {
  private readonly http = inject(HttpClient);
  private currentLotteryUpdated = new Subject<void>();
  currentLotteryUpdated$ = this.currentLotteryUpdated.asObservable();

  constructor(private sharedUserService: UserSharedService) {}

  getCurentTirage(): Observable<LotteryOverviewResponse> {
    return this.http
      .get<LotteryOverviewResponse>(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.CURRENT_LOTTERY}`,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        },
      )
      .pipe(
        catchError((error) => {
          const err: LotteryOverviewError = {
            errors: true,
            message: error.error?.message || 'Aucun tirage',
          };
          return throwError(() => err);
        }),
      );
  }

  notifyLotteryUpdate() {
    this.currentLotteryUpdated.next();
  }

  notifyUserRegistered() {
    this.currentLotteryUpdated.next();
  }
}
