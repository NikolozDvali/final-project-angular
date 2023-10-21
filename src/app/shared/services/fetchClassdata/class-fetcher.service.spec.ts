import { TestBed } from '@angular/core/testing';

import { ClassFetcherService } from './class-fetcher.service';

describe('ClassFetcherService', () => {
  let service: ClassFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
