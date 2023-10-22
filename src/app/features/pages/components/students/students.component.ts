import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomService } from 'src/app/shared/services/classroom/classroom.service';
import { Member, Owner } from 'src/app/shared/interfaces';
import { AccountDataService } from 'src/app/shared/services/accountData/account-data.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit{
  class_owner: Owner | undefined;
  class_members: Member[] = [];
  accountStatus = "Student";

  constructor(
    private classroomService: ClassroomService,
    private accountService: AccountDataService
  ){}

  ngOnInit(){
    this.classroomService.selectedClassData.subscribe(
      (data)=>{
        this.class_members = data?.class_members || [];
        this.class_owner = data?.class_owner;
      }
    )
    this.accountService.loggedInAccount.subscribe(
      (acc)=>{
        this.accountStatus = acc?.account_type || 'Status';
      }
    )
  }

  isOwner(member: Member){
    return this.class_owner && member.member_id === this.class_owner.owner_id;
  }
  
}
