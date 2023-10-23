import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap, throwError } from 'rxjs';
import { ClassNames, IAccount, IClass } from 'src/app/shared/interfaces';
import { AccountDataService } from 'src/app/shared/services/accountData/account-data.service';
import { ClassroomService } from 'src/app/shared/services/classroom/classroom.service';

@Injectable({
  providedIn: 'root'
})
export class AddStudentService {
  private baseUrl = "http://localhost:3000";

  currentAccount: IAccount | undefined;
  currentClass: IClass | undefined

  constructor(
    private http: HttpClient,
    private classroomService: ClassroomService,
    private accountService: AccountDataService
  ) { 
    this.classroomService.selectedClassData.subscribe(
      (classData)=>{
        this.currentClass = classData;
      }
    )
    this.accountService.loggedInAccount.subscribe(
      (accountData)=>{
        this.currentAccount = accountData;
      }
    )
  }

  //this must: 
  //1. check if student is valid;
  //2. check if user is already in this class;
  //3. add class id to student object (locally and in db);
  //4. add student data to classroom (locally and in db);
  addStudentToCurrentClass(studentID: string) {
    return this.checkStudent(studentID).pipe(
      switchMap((result) => {
        if (result !== "SUCCESS") {
          return of(result);
        } else {
          return this.patchStudent(studentID).pipe(
            map((res) => {
              return res;
            }),
            catchError((err) => {
              return throwError(err);
            })
          );
        }
      })
    );
  }
  

  private checkStudent(studentId: string){
    const url = this.baseUrl+'/accounts/'+studentId;
    return this.http.get<IAccount | undefined>(url).pipe(
      map(
        (studData)=>{
          if(!studData) return "Student with this ID does not exist";
          const currentClasses = studData.account_classes;
          const isAlreadyInThisClass = currentClasses.find((classroom)=>classroom.id == this.currentClass?.id);
          if(isAlreadyInThisClass){
            return "Student is already in this class";
          }
          return "SUCCESS";
        }
      )
    )
  }

  private patchStudent(studentId: string){  
    const accountUrl = this.baseUrl+'/accounts/'+studentId;
    const classUrl = this.baseUrl+'/classes/'+this.currentClass?.id;

    const newClassObj = {
      id: this.currentClass?.id as string,
      class_name: this.currentClass?.class_name as string,
    }

    const classes = this.currentAccount?.account_classes;
    classes?.push(newClassObj);   
    

    return this.http.patch(accountUrl, {account_classes: classes}).pipe(
      switchMap(()=>{
          const members = this.currentClass?.class_members;

          const newMemberObj = {
            member_id: this.currentAccount?.id as string,
            member_name: this.currentAccount?.account_name as string,
            member_grades: []
          }
          
          members?.push(newMemberObj)

          return this.http.patch(classUrl, { class_members: members });
        }
      ) 
    )
  }
}

