import { Injectable } from '@angular/core';
import { IAccount, loggedInAccount } from '../../interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {
  loggedInAccount = new BehaviorSubject<loggedInAccount>(undefined);

  constructor() {
    const storedData = localStorage.getItem("loggedInAccount");
    if(storedData){
      this.loggedInAccount.next(JSON.parse(storedData));
    }
  }

  setLoggedInAccout(iaccount: IAccount){
    this.loggedInAccount.next(iaccount);
    localStorage.setItem("loggedInAccount", JSON.stringify(iaccount));
  }

  logout(){
    this.loggedInAccount.next(undefined);
    localStorage.clear()
  }

  getAccountData(){
    return this.loggedInAccount.getValue();
  }

  isLoggedIn(){
    return this.loggedInAccount.value !== undefined;
  }

  isTeacher(){
    return this.loggedInAccount.value?.account_type=="Teacher";
  }
}
