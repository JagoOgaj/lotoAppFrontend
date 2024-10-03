import { TestBed } from '@angular/core/testing';

import { TirageResultService } from './tirage-result.service';

describe('TirageResultService', () => {
  let service: TirageResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TirageResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
