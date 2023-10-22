import { TestBed } from '@angular/core/testing';

import { NewGradeService } from './new-grade.service';

describe('NewGradeService', () => {
  let service: NewGradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewGradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
