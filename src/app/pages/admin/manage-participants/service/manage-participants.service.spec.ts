import { TestBed } from '@angular/core/testing';

import { ManageParticipantsService } from './manage-participants.service';

describe('ManageParticipantsService', () => {
  let service: ManageParticipantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageParticipantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
