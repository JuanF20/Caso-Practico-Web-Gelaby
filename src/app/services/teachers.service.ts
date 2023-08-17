import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateTeacherModel, TeacherModel, UpdateTeacherModel } from '../models/teacher.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  getTeachers(): Observable<TeacherModel[]> {
    const url = `${this.API_URL}/teachers`;
    return this.httpClient.get<TeacherModel[]>(url);
  }

  getTeacherById(id: number): Observable<TeacherModel> {
    const url = `${this.API_URL}/teachers/${id}`;
    return this.httpClient.get<TeacherModel>(url);
  }

  createTeacher(data: CreateTeacherModel): Observable<TeacherModel> {
    const url = `${this.API_URL}/teachers`;
    return this.httpClient.post<TeacherModel>(url, data);
  }

  updateTeacher(id: number, data: UpdateTeacherModel): Observable<TeacherModel> {
    const url = `${this.API_URL}/teachers/${id}`;
    return this.httpClient.patch<TeacherModel>(url, data);
  }

  deleteTeacher(id: number): Observable<void> {
    const url = `${this.API_URL}/teachers/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
