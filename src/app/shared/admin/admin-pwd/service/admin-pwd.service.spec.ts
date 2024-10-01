import { TestBed } from '@angular/core/testing';

import { AdminPwdService } from './admin-pwd.service';

describe('AdminPwdService', () => {
  let service: AdminPwdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPwdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
