import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth } from '../../../models/IAuth';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private behaviorSubject = new BehaviorSubject<boolean>(false);
  isloggedIn$ = this.behaviorSubject.asObservable();
  constructor(private http: HttpClient) {}
  RegisterUser(auth: IAuth): Observable<IAuth> {
    return this.http.post<IAuth>(`${environment.baseUrl}/Auth/Register`, auth);
  }
  LogInUser(auth: IAuth): Observable<IAuth> {
    return this.http.post<IAuth>(`${environment.baseUrl}/Auth`, auth);
  }
  RefreshToken(refreshToken: string): Observable<IAuth> {
    return this.http.post<IAuth>(`${environment.baseUrl}/Auth/RefreshToken/`, {
      refreshToken,
    });
  }
  logOut(refreshToken: string): Observable<string> {
    return this.http.post<string>(`${environment.baseUrl}/Auth/Logout/`, {
      refreshToken,
    });
  }
  getRefreshToken(): string {
    return localStorage.getItem('RefreshToken') ?? '';
  }
  setTokens(token: string, refreshToken: string | null) {
    this.behaviorSubject.next(true);
    localStorage.setItem('token', token);
    if (refreshToken != null)
      localStorage.setItem('RefreshToken', refreshToken);
  }
  ClearTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('RefreshToken');
    this.behaviorSubject.next(false);
  }
  isLogged(): boolean {
    return this.behaviorSubject.value;
  }
}
