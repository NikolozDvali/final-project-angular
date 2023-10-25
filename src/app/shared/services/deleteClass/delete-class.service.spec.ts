import { TestBed } from '@angular/core/testing';

import { DeleteClassService } from './delete-class.service';

describe('DeleteClassService', () => {
  let service: DeleteClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
