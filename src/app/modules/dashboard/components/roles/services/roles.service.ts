import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRole } from '../models/Irole';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  GetRoles(userId: string): Observable<IRole[]> {
    return this.http.get<IRole[]>(
      `${environment.baseUrl}/Users/AddToRole/${userId}`
    );
  }
  UpdateUserRoles(userid: string, roles: IRole[]): Observable<string> {
    return this.http.post<string>(
      `${environment.baseUrl}/Users/AddToRole/${userid}`,
      roles
    );
  }
}
