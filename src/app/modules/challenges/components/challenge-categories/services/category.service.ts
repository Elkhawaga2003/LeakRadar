import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/Icategory';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  Get(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${environment.baseUrl}/Category`);
  }
  GetById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${environment.baseUrl}/Category/${id}`);
  }
  Update(Category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(
      `${environment.baseUrl}/Category`,
      Category
    );
  }
  Delete(id: number): Observable<string> {
    return this.http.delete<string>(`${environment.baseUrl}/Category/${id}`);
  }
  Add(Category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(
      `${environment.baseUrl}/Category`,
      Category
    );
  }
}
