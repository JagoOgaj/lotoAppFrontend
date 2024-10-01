import { TestBed } from '@angular/core/testing';

import { LottoryFormService } from './lottory-form.service';

describe('LottoryFormService', () => {
  let service: LottoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LottoryFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
