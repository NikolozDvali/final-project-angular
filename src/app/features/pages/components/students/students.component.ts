import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomService } from 'src/app/shared/services/classroom/classroom.service';
import { Grade, Member, Owner } from 'src/app/shared/interfaces';
import { AccountDataService } from 'src/app/shared/services/accountData/account-data.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewGradeFormComponent } from 'src/app/features/new-grade-form/components/new-grade-form/new-grade-form.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NewGradeFormComponent],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit{
  class_owner: Owner | undefined;
  class_members: Member[] = [];
  accountStatus = "Student";
  selectedGrade: Grade | undefined;
  selectedStudentId: string | undefined;

  constructor(
    private classroomService: ClassroomService,
    private accountService: AccountDataService,
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

  setSelectedGrade(grade: Grade | undefined){
    this.selectedGrade = grade;
  }

  isOwner(member: Member){
    return this.class_owner && member.member_id === this.class_owner.owner_id;
  }

  setSelectedId(id: string | undefined){
    this.selectedStudentId = id;
  }
  
}
