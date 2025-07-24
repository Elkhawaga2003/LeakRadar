import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEditorContent } from '../model/IEditorContent';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  constructor(private http: HttpClient) {}
  Get(skip: number): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/Editor/GetPadding/${skip}`
    );
  }
  Add(editorContent: FormData): Observable<string> {
    return this.http.post<string>(
      `${environment.baseUrl}/Editor`,
      editorContent
    );
  }
  GetById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/Editor/${id}`);
  }
  Delete(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.baseUrl}/Editor/${id}`);
  }
  Update(editorContent: FormData): Observable<string> {
    editorContent.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    return this.http.put<string>(
      `${environment.baseUrl}/Editor`,
      editorContent
    );
  }
  GetPostCount(): Observable<number> {
    return this.http.get<number>(`${environment.baseUrl}/Editor/PostsCount`);
  }
}
