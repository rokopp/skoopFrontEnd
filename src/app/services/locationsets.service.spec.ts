import { TestBed } from '@angular/core/testing';

import { LocationsetsService } from './locationsets.service';

describe('LocationsetsService', () => {
  let service: LocationsetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationsetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
