import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClass } from '../../interfaces';
import { Observable } from 'rxjs'; // You should import Observable

@Injectable({
  providedIn: 'root'
})
export class ClassFetcherService {
  private baseUrl = 'http://localhost:3000/classes';

  constructor(
    private http: HttpClient
  ) { }

  getClassData(id: string): Observable<IClass> {
    const url = `${this.baseUrl}/${id}`;
    
    return this.http.get<IClass>(url);
  }
}
