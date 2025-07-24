import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ichallenge } from '../models/Ichallenge';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  constructor(private http: HttpClient) {}

  Get(): Observable<Ichallenge[]> {
    return this.http.get<Ichallenge[]>(`${environment.baseUrl}/Challenge`);
  }
  Add(challenge: Ichallenge): Observable<string> {
    console.log(challenge);

    var formData = new FormData();
    formData.append('Title', challenge.title);
    formData.append('Flag', challenge.flag);
    formData.append('CategoryId', challenge.categoryId.toString());
    if (challenge.coverImg) {
      formData.append('CoverImg', challenge.coverImg);
    }
    formData.append('Difficulty', challenge.difficulty);
    formData.append('Description', challenge.description);
    formData.append('Points', challenge.points.toString());
    if (challenge.attachmetFile) {
      formData.append('AttachmetFile', challenge.attachmetFile);
    }
    if (challenge.challengeUrl) {
      formData.append('ChallengeUrl', challenge.challengeUrl);
    }
    formData.append('IsVasible', challenge.isVasible.toString());

    return this.http.post<string>(`${environment.baseUrl}/Challenge`, formData);
  }
  Update(challenge: Ichallenge): Observable<string> {
    var formData = new FormData();

    formData.append('Id', challenge.id.toString());
    formData.append('Title', challenge.title);
    formData.append('Flag', challenge.flag);
    formData.append('CategoryId', challenge.categoryId.toString());
    if (challenge.coverImg) {
      formData.append('CoverImg', challenge.coverImg);
    }
    formData.append('Difficulty', challenge.difficulty);
    formData.append('Description', challenge.description);
    formData.append('Points', challenge.points.toString());
    if (challenge.attachmetFile) {
      formData.append('AttachmetFile', challenge.attachmetFile);
    }
    if (challenge.challengeUrl) {
      formData.append('ChallengeUrl', challenge.challengeUrl);
    }
    formData.append('IsVasible', challenge.isVasible.toString());

    return this.http.put<string>(`${environment.baseUrl}/Challenge`, formData);
  }
  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${environment.baseUrl}/Challenge/${id}`);
  }
  Getbyid(id: number): Observable<Ichallenge> {
    return this.http.get<Ichallenge>(`${environment.baseUrl}/Challenge/${id}`);
  }
  submitFlag(SubmittedFlag: string, id: number): Observable<string> {
    return this.http.post<string>(
      `${environment.baseUrl}/Challenge/${id}/submit-flag`,
      { SubmittedFlag }
    );
  }
}
