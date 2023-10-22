import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageControlService {
  page = new BehaviorSubject<string>("posts");

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlParts = event.url.split('/');
        const lastPart = urlParts[urlParts.length - 1];
        if(lastPart == 'posts' || lastPart == 'students' || lastPart == 'grades'){
          this.updatePage(lastPart);
        }
      }
    });


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
