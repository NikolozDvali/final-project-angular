import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Account, IAccount } from 'src/app/shared/interfaces';
import { RandomService } from 'src/app/shared/services/random/random.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private accountsUrl = 'http://localhost:3000/accounts';

  constructor(
    private http: HttpClient,
    private random: RandomService
  ) {}

  register(account: Account){
    const iaccount: IAccount = {...account, account_id: '', account_classes: []};
    iaccount.account_id = this.random.generateRandomId();

    return this.http.post<IAccount>(this.accountsUrl, iaccount).pipe(
      catchError(
        (err)=>{
          if(err.status == 409){
            iaccount.account_id = this.random.generateRandomId();
            return this.http.post<IAccount>(this.accountsUrl, iaccount);
          }else{
            return throwError(err);
          }
        }
      )
    ).subscribe();
  }
}
