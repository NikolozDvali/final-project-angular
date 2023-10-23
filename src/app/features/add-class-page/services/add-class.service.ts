import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, mergeMap, throwError } from 'rxjs';
import { ClassNames, IAccount, IClass } from 'src/app/shared/interfaces';
import { AccountDataService } from 'src/app/shared/services/accountData/account-data.service';
import { RandomService } from 'src/app/shared/services/random/random.service';

@Injectable({
  providedIn: 'root'
})
export class AddClassService {
  private classesUrl = 'http://localhost:3000/classes';
  private accountsUrl = 'http://localhost:3000/accounts';
  user: IAccount | undefined;

  constructor(
    private http: HttpClient,
    private random: RandomService,
    private accountService: AccountDataService
  ) {
    this.accountService.loggedInAccount.subscribe((data) => {
      this.user = data;
    });
  }

  addClass(classname: string): Observable<boolean> {
    const classObj: IClass = {
      class_members: [],
      class_owner: {
        owner_id: this.user?.id || '',
        owner_name: this.user?.account_name || '',
      },
      class_name: classname,
      class_posts: [],
      id: this.random.generateRandomId(10),
    };

    return this.postRequest(this.classesUrl, classObj).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err); 
      }),
      mergeMap(() => {
        const newClassNameObj = {
          class_name: classObj.class_name,
          id: classObj.id,
        };

        const newClassNamesArray: ClassNames[] = this.user?.account_classes as ClassNames[];
        newClassNamesArray.push(newClassNameObj);

        const patchData = {
          account_classes: newClassNamesArray,
        }

        return this.patchRequest(this.accountsUrl+'/'+this.user?.id, patchData).pipe(
          map(() => true),
          catchError((err: HttpErrorResponse) => {
            return throwError(err);
          })
        );
      })
    );
  }

  postRequest(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  patchRequest(url: string, data: any): Observable<any> {
    return this.http.patch(url, data);
  }
}
