import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClass } from '../../interfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassFetcherService {
  private baseUrl = 'http://localhost:3000/classes';

  constructor(
    private http: HttpClient
  ) { }

  getClassData(id: string) {
    const url = `${this.baseUrl}?class_id=${id}`;
    
    return this.http.get<IClass[]>(url).pipe(
      map((classes: IClass[]) => {
        return classes[0]; 
      })
    );
  }
}
