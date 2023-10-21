import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
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

  register(account: Account): Observable<boolean> {
    const iaccount: IAccount = { ...account, account_id: ''};
    iaccount.account_id = this.random.generateRandomId();
  
    return this.http.get<IAccount[]>(this.accountsUrl, { params: { account_email: iaccount.account_email, account_password: iaccount.account_password } })
      .pipe(
        switchMap((existingAccounts) => {
          if (existingAccounts.length === 0) {
            return this.postRequest(iaccount).pipe(
              map(() => true) 
            );
          } else {
            return of(false);
          }
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }

  postRequest(iaccount: IAccount): Observable<boolean> {
    return this.http.post<IAccount>(this.accountsUrl, iaccount).pipe(
      map(() => true),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 409) {
          iaccount.account_id = this.random.generateRandomId();
          return this.postRequest(iaccount);
        } else {
          return throwError(err);
        }
      })
    );
  }
}
