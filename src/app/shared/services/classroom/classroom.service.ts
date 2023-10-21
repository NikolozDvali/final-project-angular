import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Class, IClass, chosenClass } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { ClassFetcherService } from '../fetchClassdata/class-fetcher.service';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  chosenClass = new BehaviorSubject<chosenClass>(undefined);

  constructor(
    private classFetcher: ClassFetcherService
  ) { }

  setNewChosenClass(class_id: string) {
    this.classFetcher.getClassData(class_id).subscribe(
      (classData)=>{
        this.chosenClass.next(classData);
      }
    )
  }

  getChosenClass(){
    return this.chosenClass.getValue();
  }

}
