import { TestBed } from '@angular/core/testing';

import { PageControlService } from './page-control.service';

describe('PageControlService', () => {
  let service: PageControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
