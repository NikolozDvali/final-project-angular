import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGradeFormComponent } from './new-grade-form.component';

describe('NewGradeFormComponent', () => {
  let component: NewGradeFormComponent;
  let fixture: ComponentFixture<NewGradeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewGradeFormComponent]
    });
    fixture = TestBed.createComponent(NewGradeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
