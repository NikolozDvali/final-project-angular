import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.scss']
})
export class AddStudentFormComponent {

  constructor(
    private formBuilder: FormBuilder
  ){}

  newStudentForm = this.formBuilder.group({
    studentId: ['', Validators.required]
  })
}
