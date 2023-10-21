import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAccount } from 'src/app/shared/interfaces';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private accountsUrl = 'http://localhost:3000/accounts';

  constructor(
    private http: HttpClient
  ) { }

  tryLogin(email: string, password: string): Observable<IAccount | undefined>{
    return this.http.get<IAccount[]>(this.accountsUrl).pipe(
      map((accounts)=>{
        const matchingAccount = accounts.find((account) => account.account_email === email && account.account_password === password);
        return matchingAccount;
      })
    )
  }
}
