import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccountDataService } from 'src/app/shared/services/accountData/account-data.service';
import { ClassroomService } from 'src/app/shared/services/classroom/classroom.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddClassService } from '../../services/add-class.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-class',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddClassComponent {

  constructor(
    private router: Router,
    private accountService: AccountDataService,
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    private addClassService: AddClassService,
  ){}

  goToMain(){
    const firstclassroom = this.accountService.loggedInAccount.value?.account_classes[0];
    if(firstclassroom){
      this.classroomService.setSelectedClassId(firstclassroom.id);
      this.router.navigate(['main', firstclassroom.class_name, 'posts']);
    }else{
      this.router.navigate(['/main'])
    }
  }

  classForm = this.formBuilder.group({
    name: ['', Validators.required]
  })

  addClass(){
    const className = this.classForm.value.name;
    this.classForm.reset();
    if(!className) return;
    this.addClassService.addClass(className).subscribe(
      (data)=>{
        if(data!==true) return;
        this.router.navigate([`main/${className}/posts`])
      }
    )
  }
}
