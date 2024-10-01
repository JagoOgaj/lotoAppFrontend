import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSharedService {
  private lotteryUpdateSource = new Subject<void>();
  lotteryUpdate$ = this.lotteryUpdateSource.asObservable();

  notifyLotteryUpdate() {
    this.lotteryUpdateSource.next();
  }
}
