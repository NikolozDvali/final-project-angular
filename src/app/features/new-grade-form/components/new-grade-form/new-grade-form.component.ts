import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Grade } from 'src/app/shared/interfaces';
import { DateService } from 'src/app/features/new-post-form/services/date/date.service';
import { NewGradeService } from '../../services/new-grade.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-new-grade-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-grade-form.component.html',
  styleUrls: ['./new-grade-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NewGradeFormComponent implements OnChanges{
  @Input() selectedStudentId: string | undefined;
  @Output() selectedStudentChangeEvent = new EventEmitter<string | undefined>();

  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private newGradeService: NewGradeService,
    private cdr: ChangeDetectorRef
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

  addGrade(){
    const formValue = this.gradeForm.value;;
    this.gradeForm.reset();

    const grade: Grade = {
      grade: formValue.grade || 0,
      comment: formValue.comment || '',
      date: this.dateService.getCurrentDate(),
    }

   this.newGradeService.addNewGrade(this.selectedStudentId || '', grade).subscribe(
    (resp)=>{
      if(resp!=='SUCCESS'){
        this.errorMessage = resp;
      }else{
        this.errorMessage = '';
      }
      this.selectedStudentChangeEvent.emit(undefined);
      this.cdr.markForCheck()
    }
   );
  }
}
