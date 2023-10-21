import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Class, IClass, chosenClass } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { ClassFetcherService } from '../fetchClassdata/class-fetcher.service';
import { Router } from '@angular/router';
import { PageControlService } from 'src/app/features/pages/services/pageControl/page-control.service';
import { AccountDataService } from '../accountData/account-data.service';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  selectedClassData = new BehaviorSubject<chosenClass>(undefined);
  selectedClassId = new BehaviorSubject<string | undefined>(undefined);

  constructor(
    private classFetcher: ClassFetcherService,
    private accountService: AccountDataService
  ){
    const selectedClassIdInStorage = localStorage.getItem("selectedClassId");
    if(selectedClassIdInStorage){
      this.setSelectedClassId(selectedClassIdInStorage);
    }

    this.selectedClassId.subscribe(
      (newId)=>{
        this.getClassData(newId || '');
      }
    )
  }

  setSelectedClassId(id: string){
    localStorage.setItem("selectedClassId", id);
    this.selectedClassId.next(id);
  }


  getClassData(id: string){
    if(id=='') return;

    const data = localStorage.getItem('class/'+id);
    if(data){
      this.setSelectedClassData(JSON.parse(data));
    }

    this.classFetcher.getClassData(id).subscribe(
      (data)=>{
       this.setSelectedClassData(data);
      }
    )
  }

  
  setSelectedClassData(iclass: IClass){
    localStorage.setItem("class/"+iclass.class_id, JSON.stringify(iclass));
    this.selectedClassData.next(iclass);
  }
}
