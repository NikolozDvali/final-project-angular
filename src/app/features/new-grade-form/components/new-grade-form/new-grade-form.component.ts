import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-grade-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-grade-form.component.html',
  styleUrls: ['./new-grade-form.component.scss']
})
export class NewGradeFormComponent implements OnChanges{
  @Input() selectedStudentId: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
  ){}

  gradeForm = this.formBuilder.group(
    {
      studentId: ['', Validators.required],
      grade: [10, [Validators.required, Validators.max(10), Validators.min(0)]],
      comment: ['', ],
    }
  )

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedStudentId'] && this.selectedStudentId !== undefined) {
      this.gradeForm.patchValue({ studentId: this.selectedStudentId });
    }
  }
}
