import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Class, IClass, chosenClass } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { ClassFetcherService } from '../fetchClassdata/class-fetcher.service';
import { NavigationEnd, Router } from '@angular/router';
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
    private accountService: AccountDataService,
    private router: Router
  ){

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlParts = event.url.split('/');
        const classname = urlParts[urlParts.length - 2];
        const classid = this.accountService.loggedInAccount.value?.account_classes.find(elem=>elem.class_name==classname)?.id;

        if(classid){
          this.setSelectedClassId(classid);
        }
        }
      }
    )

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

  setSelectedClassId(id: string | undefined){
    if(!id){
      id = '';
    }
    localStorage.setItem("selectedClassId", id);
    this.selectedClassId.next(id);
  }


  getClassData(id: string){
    if(!id) return;

    const data = localStorage.getItem('class/'+id);
    if(data){
      this.setSelectedClassData(JSON.parse(data));
      return;
    }

    this.classFetcher.getClassData(id).subscribe(
      (data)=>{
        if(!data) return;
       this.setSelectedClassData(data);
      }
    )
  }

  refetchClass(id: string){
    localStorage.removeItem('class/'+id);
    this.getClassData(id);
  }
  
  setSelectedClassData(iclass: IClass){
    localStorage.setItem("class/"+iclass.id, JSON.stringify(iclass));
    this.selectedClassData.next(iclass);
  }
}
