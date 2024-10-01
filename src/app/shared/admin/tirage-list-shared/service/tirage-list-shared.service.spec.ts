import { TestBed } from '@angular/core/testing';

import { TirageListSharedService } from './tirage-list-shared.service';

describe('TirageListSharedService', () => {
  let service: TirageListSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TirageListSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
