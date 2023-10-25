import { Injectable } from '@angular/core';
import { ClassroomService } from '../classroom/classroom.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { IAccount, IClass, Member } from '../../interfaces';
import { AccountDataService } from '../accountData/account-data.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteClassService {
  private baseUrl = 'http://localhost:3000/';
  private accountsUrl = this.baseUrl+'accounts';
  private classesUrl = this.baseUrl+'classes';


  constructor(
    private classroomService: ClassroomService,
    private http: HttpClient,
    private accountService: AccountDataService
  ) { }

  deleteCurrentClass(){
    const deletingClassroom  = this.classroomService.selectedClassData.value;
    if(!deletingClassroom) return;

    const members = deletingClassroom.class_members;

    // remove classroom from each student object in db;
    this.changeMembers(members[0], deletingClassroom).subscribe(
      ()=>{
        members.shift();
        if(members.length == 0) return;
        this.changeMembers(members[0], deletingClassroom).subscribe();
      },
      (error) => {
          console.error(`Patch request for ID ${members[0].member_id} error:`, error);
      }
    );
    

    const teacher = this.accountService.getAccountData() as IAccount;
    let teacherClasses = teacher.account_classes;
    teacherClasses = teacherClasses.filter(elem=>elem.id != deletingClassroom.id);
    teacher.account_classes = teacherClasses;
    //remove classroom from teachers account (in db and locally);
    this.http.patch(this.accountsUrl+'/'+teacher.id, {account_classes: teacherClasses}).pipe(
      map(()=>{
        this.accountService.setLoggedInAccout(teacher);
      })
    ).subscribe()
    
    //delete classroom object itself;
    this.http.delete(this.classesUrl+'/'+deletingClassroom.id).pipe(
      map(()=>{
        //change selected classrom 
        const newClassId = teacherClasses[0].id;
        if(!newClassId) return;
        this.classroomService.setSelectedClassId(newClassId);
      })
    ).subscribe();
  }

  changeMembers(member: Member, deletingClassroom: IClass){
    return this.http.get<IAccount>(this.accountsUrl+'/'+member.member_id).pipe(
      switchMap(
        (iaccount)=>{
          const newClasses = iaccount.account_classes.filter(classroom=>classroom.id!=deletingClassroom.id);
          return this.http.patch(this.accountsUrl+'/'+iaccount.id, {account_classes: newClasses}).pipe(
            map(()=>true)
          );
        }
      )
    );
  }
}
