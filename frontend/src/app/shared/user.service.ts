import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users = new BehaviorSubject<any>([]);

  private baseUrl = "http://localhost:4000";
  constructor(private httpClient: HttpClient) {

  }

  getUsers(): Observable<any> {
    let url = this.baseUrl + "/api/v2/users";
    return this.httpClient.get(url).pipe(
     map((r: any) => {
       return r;
     })
    );
  }

  deleteUser(email: string): Observable<any> {
    let url = this.baseUrl + `/api/v2/users/${email}`;
    return this.httpClient.delete(url).pipe(
     map((r: any) => {
       return r;
     })
    );
  }

  createUser(params): Observable<any> {
    let url = this.baseUrl + `/api/v2/users`;

    return this.httpClient.post(url, params).pipe(
     map((r: any) => {
       return r;
     })
    );
  }

  updateUser(email, params): Observable<any> {
    let url = this.baseUrl + `/api/v2/users/${email}`;

    return this.httpClient.patch(url, params).pipe(
     map((r: any) => {
       return r;
     })
    );
  }

  getUser(email): Observable<any> {
    let url = this.baseUrl + `/api/v2/users/${email}`;

    return this.httpClient.get(url).pipe(
     map((r: any) => {
       return r;
     })
    );
  }
}
