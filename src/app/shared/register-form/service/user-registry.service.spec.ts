import { TestBed } from '@angular/core/testing';

import { UserRegistryService } from './user-registry.service';

describe('UserRegistryService', () => {
  let service: UserRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
