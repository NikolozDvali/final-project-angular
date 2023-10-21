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
    localStorage.removeItem("loggedInAccount");
  }

  getAccountData(){
    return this.loggedInAccount.getValue();
  }
}
