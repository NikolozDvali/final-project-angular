import { Injectable } from '@angular/core';
import { ClassroomService } from '../classroom/classroom.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, concatMap } from 'rxjs/operators';
import { IAccount, IClass, Member } from '../../interfaces';
import { AccountDataService } from '../accountData/account-data.service';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteClassService {
  private baseUrl = 'http://localhost:3000/';
  private accountsUrl = this.baseUrl + 'accounts';
  private classesUrl = this.baseUrl + 'classes';

  constructor(
    private classroomService: ClassroomService,
    private http: HttpClient,
    private accountService: AccountDataService
  ) {}

  deleteCurrentClass() {
    const deletingClassroom = this.classroomService.selectedClassData.value;
    if (!deletingClassroom) return;

    const members = deletingClassroom.class_members;

    //remove classroom from every member object in db;
    const removeClassFromMembers = (member: Member) => {
      return this.changeMembers(member, deletingClassroom).pipe(
        map(() => true),
        catchError((error) => {
          console.error(`Patch request for ID ${member.member_id} error:`, error);
          return of(false);
        })
      );
    };

    const teacher = this.accountService.getAccountData() as IAccount;
    let teacherClasses = teacher.account_classes;
    teacherClasses = teacherClasses.filter((elem) => elem.id !== deletingClassroom.id);
    teacher.account_classes = teacherClasses;

    //remove classroom object from teachers object in db;
    const removeClassFromTeacher = () => {
      return this.http.patch(this.accountsUrl + '/' + teacher.id, { account_classes: teacherClasses }).pipe(
        concatMap(() => {
          //to update teachers classrooms locally:
          this.accountService.setLoggedInAccout(teacher);

          return removeClassObjectItself();
        })
      );
    };

    const removeClassObjectItself = () => {
      return this.http.delete(this.classesUrl + '/' + deletingClassroom.id).pipe(
        map(() => {
          return EMPTY;
        })
      );
    };

    members.reduce((acc, member) => {
      return acc.pipe(concatMap(() => removeClassFromMembers(member)));
    }, of(true)).pipe(
      concatMap(() => removeClassFromTeacher())
    ).subscribe(
      ()=>{
          const newClassId = teacherClasses[0]?.id;
          if (!newClassId){
            this.classroomService.setSelectedClassId('');
            return EMPTY;
          } 
          this.classroomService.setSelectedClassId(newClassId);
          return of(true);
      });
  }

  changeMembers(member: Member, deletingClassroom: IClass) {
    return this.http.get<IAccount>(this.accountsUrl + '/' + member.member_id).pipe(
      switchMap((iaccount) => {
        const newClasses = iaccount.account_classes.filter((classroom) => classroom.id !== deletingClassroom.id);
        return this.http.patch(this.accountsUrl + '/' + iaccount.id, { account_classes: newClasses }).pipe(
          map(() => true)
        );
      })
    );
  }
}
