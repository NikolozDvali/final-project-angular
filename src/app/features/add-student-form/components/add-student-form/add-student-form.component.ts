import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddStudentService } from '../../services/add-student.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AddStudentFormComponent {
  errorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private addStudentService: AddStudentService,
    private cdr: ChangeDetectorRef
  ){}

  newStudentForm = this.formBuilder.group({
    studentId: ['', Validators.required]
  })

  addStudent(){
    const studentId = this.newStudentForm.controls.studentId.value;
    if(!studentId) return;
    this.addStudentService.addStudentToCurrentClass(studentId).subscribe(
      (result)=>{
        this.errorMessage = result || '';
        this.cdr.markForCheck();
      }
    );
    this.newStudentForm.reset();
  }
}
