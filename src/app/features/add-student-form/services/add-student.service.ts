import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddStudentService {

  constructor() { }

  addStudentToCurrentClass(studentID: string){
    console.log("adding student "+studentID);
  }
}
