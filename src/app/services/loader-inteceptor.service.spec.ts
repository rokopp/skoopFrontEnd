import { TestBed } from '@angular/core/testing';

import { LoaderInterceptorService } from './loader-interceptor.service';

describe('LoaderInteceptorService', () => {
  let service: LoaderInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
