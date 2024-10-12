import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Service pour partager des informations sur les mises à jour de la loterie.
 * @class UserSharedService
 * @description Ce service permet aux composants d'être notifiés des mises à jour de la loterie.
 */
@Injectable({
  providedIn: 'root',
})
export class UserSharedService {
  private lotteryUpdateSource = new Subject<void>();
  lotteryUpdate$ = this.lotteryUpdateSource.asObservable();

  /**
   * Notifie les abonnés d'une mise à jour de la loterie.
   * @method notifyLotteryUpdate
   * @example
   * userSharedService.notifyLotteryUpdate();
   */
  notifyLotteryUpdate() {
    this.lotteryUpdateSource.next();
  }
}
