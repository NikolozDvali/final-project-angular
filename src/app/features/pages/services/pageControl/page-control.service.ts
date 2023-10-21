import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageControlService {
  page = new BehaviorSubject<string>("posts");

  constructor() {
    const storedVal = localStorage.getItem("page");
    if(storedVal){
      this.updatePage(storedVal);
    }
  }

  updatePage(newPage: string){
    localStorage.setItem("page", newPage);
    this.page.next(newPage);
  }

  getPage(){
    return this.page.asObservable();
  }
}
