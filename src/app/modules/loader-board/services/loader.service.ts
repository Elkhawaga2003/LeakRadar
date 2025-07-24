import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoadboader } from '../models/ILoadboader';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(private http: HttpClient) {}
  Get(): Observable<ILoadboader[]> {
    return this.http.get<ILoadboader[]>(`${environment.baseUrl}/LeadBoard`);
  }
}
