import { TestBed } from '@angular/core/testing';

import { BackgroundImageChangeService } from './background-image-change.service';

describe('BackgroundImageChangeService', () => {
  let service: BackgroundImageChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundImageChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
