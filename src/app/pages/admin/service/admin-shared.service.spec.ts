import { TestBed } from '@angular/core/testing';

import { AdminSharedService } from './admin-shared.service';

describe('AdminSharedService', () => {
  let service: AdminSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
