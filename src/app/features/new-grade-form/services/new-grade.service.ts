import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Grade, IAccount, IClass } from 'src/app/shared/interfaces';
import { ClassroomService } from 'src/app/shared/services/classroom/classroom.service';

@Injectable({
  providedIn: 'root'
})
export class NewGradeService {
  private baseUrl = "http://localhost:3000";

  constructor(
    private http: HttpClient,
    private classroomService: ClassroomService
  ) { }

  addNewGrade(studentId: string, grade: Grade): Observable<string> {
    return this.checkStudent(studentId).pipe(
      switchMap(userCheck => {
        if (userCheck !== 'SUCCESS') {
          return of(userCheck);
        }

        this.updateClassroom(studentId, grade);
        return of(userCheck);
      })
    );
  }

  private updateClassroom(studentId: string, grade: Grade) {
    const currentMembers = this.classroomService.selectedClassData.value?.class_members;
    currentMembers?.find((stud) => stud.member_id == studentId)?.member_grades.push(grade);

    const classId = this.classroomService.selectedClassId.value;
    const url = `${this.baseUrl}/classes/${classId}`;
    this.http.patch(url, { class_members: currentMembers }).subscribe(
      ()=>{
        this.classroomService.refetchClass(classId as string)
      }
    );
  }

  private checkStudent(studentId: string): Observable<string> {
    const url = `${this.baseUrl}/classes/${this.classroomService.selectedClassId.value}`;

    return this.http.get<IClass>(url).pipe(
      map((classData) => {
        const isEnrolled = classData.class_members.some(elem => elem.member_id === studentId);
        if (isEnrolled) {
          return 'SUCCESS';
        } else {
          return 'Student is not in this class';
        }
      }),
      catchError(error => {
        if (error.status === 404) {
          return of('This Student Does Not Exist');
        } else {
          return of('An error occurred');
        }
      })
    );
  }
}
