import { TestBed } from '@angular/core/testing';

import { ActiveRoomsService } from './active-rooms.service';

describe('ActiveRoomsService', () => {
  let service: ActiveRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
