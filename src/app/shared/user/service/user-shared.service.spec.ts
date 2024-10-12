import { TestBed } from '@angular/core/testing';
import { UserSharedService } from './user-shared.service';
import { Subscription } from 'rxjs';

describe('UserSharedService', () => {
  let service: UserSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should notify lottery updates', (done) => {
    service.lotteryUpdate$.subscribe(() => {
      expect(true).toBe(true);
      done();
    });

    service.notifyLotteryUpdate();
  });

  it('should not throw an error when notifying without subscription', () => {
    expect(() => service.notifyLotteryUpdate()).not.toThrow();
  });
});
