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
    if(class_id == undefined){
      this.chosenClass.next(undefined);
      return;
    }

    const storedData = localStorage.getItem("class/"+class_id);
    if(storedData){
      this.chosenClass.next(JSON.parse(storedData));
      return;
    }

    
    this.classFetcher.getClassData(class_id).subscribe(
      (classData)=>{
        localStorage.setItem("class/"+class_id, JSON.stringify(classData));
        this.chosenClass.next(classData);
      }
    )
  }

  getChosenClass(){
    return this.chosenClass.asObservable();
  }

}
