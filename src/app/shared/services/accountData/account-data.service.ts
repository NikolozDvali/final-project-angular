import { Injectable } from '@angular/core';
import { IAccount, loggedInAccount } from '../../interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {
  loggedInAccount = new BehaviorSubject<loggedInAccount>(undefined);

  constructor() { }

  setLoggedInAccout(iaccount: IAccount){
    this.loggedInAccount.next(iaccount);
    console.log("LOGGED IN ACCOUNT IS", this.loggedInAccount.value)
  }

  logout(){
    this.loggedInAccount.next(undefined);
  }
}
