import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassComponent } from './add-class.component';

describe('AddClassComponent', () => {
  let component: AddClassComponent;
  let fixture: ComponentFixture<AddClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddClassComponent]
    });
    fixture = TestBed.createComponent(AddClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
