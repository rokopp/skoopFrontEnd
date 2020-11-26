import { TestBed } from '@angular/core/testing';

import { QuestionsetsService } from './questionsets.service';

describe('QuestionsetsService', () => {
  let service: QuestionsetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
