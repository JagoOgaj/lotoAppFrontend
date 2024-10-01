import { TestBed } from '@angular/core/testing';

import { AcountAdminService } from './acount-admin.service';

describe('AcountAdminService', () => {
  let service: AcountAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcountAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
