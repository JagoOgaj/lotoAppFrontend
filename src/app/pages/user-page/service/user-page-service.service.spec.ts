import { TestBed } from '@angular/core/testing';

import { UserPageServiceService } from './user-page-service.service';

describe('UserPageServiceService', () => {
  let service: UserPageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
