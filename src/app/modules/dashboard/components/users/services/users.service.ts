import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  GetUsers(skip: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.baseUrl}/Users/${skip}`);
  }
  GetUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(
      `${environment.baseUrl}/Users/GetUserById/${id}`
    );
  }
  Delete(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.baseUrl}/Users/${id}`);
  }

  Update(user: IUser): Observable<string> {
    return this.http.put<string>(`${environment.baseUrl}/Users/Update`, user);
  }
  GetUserCount(): Observable<number> {
    return this.http.get<number>(`${environment.baseUrl}/Users/UsersCount`);
  }
}
