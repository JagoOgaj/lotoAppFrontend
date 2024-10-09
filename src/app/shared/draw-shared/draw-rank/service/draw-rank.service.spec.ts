import { TestBed } from '@angular/core/testing';

import { DrawRankService } from './draw-rank.service';

describe('DrawRankService', () => {
  let service: DrawRankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawRankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
