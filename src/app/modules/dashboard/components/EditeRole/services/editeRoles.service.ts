import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EditeRolesService {
  constructor(private http: HttpClient) {}
  Get(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.baseUrl}/Role`);
  }
  Delete(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.baseUrl}/Role/${id}`);
  }
  update(id: string, roleName: string): Observable<Role> {
    let role = {
      id: id,
      name: roleName,
    };
    return this.http.put<Role>(`${environment.baseUrl}/Role/`, role);
  }
  GetById(id: string): Observable<Role> {
    return this.http.get<Role>(`${environment.baseUrl}/Role/${id}`);
  }
  Create(roleName: string): Observable<Role> {
    var sendData = {
      Name: roleName,
    };
    return this.http.post<Role>(`${environment.baseUrl}/Role`, sendData);
  }
}
