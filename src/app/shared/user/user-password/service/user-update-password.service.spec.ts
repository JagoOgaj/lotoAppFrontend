import { TestBed } from '@angular/core/testing';

import { UserUpdatePasswordService } from './user-update-password.service';

describe('UserUpdatePasswordService', () => {
  let service: UserUpdatePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserUpdatePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
