import { TestBed } from '@angular/core/testing';

import { TirageEditService } from './tirage-edit.service';

describe('TirageEditService', () => {
  let service: TirageEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TirageEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
