import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeachersDetailsModel,CreateTeachersDetailsModel,UpdateTeachersDetailsModel } from '../models/teachers-details.model'; 

@Injectable({
  providedIn: 'root'
})
export class TeachersDetailsService {
  API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  getTeacherDetails(): Observable<TeachersDetailsModel[]> {
    const url = `${this.API_URL}/teachers-details`;
    return this.httpClient.get<TeachersDetailsModel[]>(url);
  }

  getTeacherDetailById(id: number): Observable<TeachersDetailsModel> {
    const url = `${this.API_URL}/teachers-details/${id}`;
    return this.httpClient.get<TeachersDetailsModel>(url);
  }

  createTeacherDetail(data: CreateTeachersDetailsModel): Observable<TeachersDetailsModel> {
    const url = `${this.API_URL}/teachers-details`;
    return this.httpClient.post<TeachersDetailsModel>(url, data);
  }

  updateTeacherDetail(id: number, data: UpdateTeachersDetailsModel): Observable<TeachersDetailsModel> {
    const url = `${this.API_URL}/teachers-details/${id}`;
    return this.httpClient.patch<TeachersDetailsModel>(url, data);
  }

  deleteTeacherDetail(id: number): Observable<void> {
    const url = `${this.API_URL}/teachers-details/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
