import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateSubjectModel, SubjectModel, UpdateSubjectModel } from '../models/subject.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  getSubjects(): Observable<SubjectModel[]> {
    const url = `${this.API_URL}/subjects`;
    return this.httpClient.get<SubjectModel[]>(url);
  }

  getSubjectById(id: number): Observable<SubjectModel> {
    const url = `${this.API_URL}/subjects/${id}`;
    return this.httpClient.get<SubjectModel>(url);
  }

  createSubject(data: CreateSubjectModel): Observable<SubjectModel> {
    const url = `${this.API_URL}/subjects`;
    return this.httpClient.post<SubjectModel>(url, data);
  }

  updateSubject(id: number, data: UpdateSubjectModel): Observable<SubjectModel> {
    const url = `${this.API_URL}/subjects/${id}`;
    return this.httpClient.patch<SubjectModel>(url, data);
  }

  deleteSubject(id: number): Observable<void> {
    const url = `${this.API_URL}/subjects/${id}`;
    return this.httpClient.delete<void>(url);
  }

}
