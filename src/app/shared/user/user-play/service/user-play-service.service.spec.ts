import { TestBed } from '@angular/core/testing';

import { UserPlayServiceService } from './user-play-service.service';

describe('UserPlayServiceService', () => {
  let service: UserPlayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPlayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
