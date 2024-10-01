import { TestBed } from '@angular/core/testing';

import { TirageListService } from './tirage-list.service';

describe('TirageListService', () => {
  let service: TirageListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TirageListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
