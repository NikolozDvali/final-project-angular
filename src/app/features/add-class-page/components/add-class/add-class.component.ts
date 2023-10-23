import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccountDataService } from 'src/app/shared/services/accountData/account-data.service';
import { ClassroomService } from 'src/app/shared/services/classroom/classroom.service';

@Component({
  selector: 'app-add-class',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent {

  constructor(
    private router: Router,
    private accountService: AccountDataService,
    private classroomService: ClassroomService
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
}
