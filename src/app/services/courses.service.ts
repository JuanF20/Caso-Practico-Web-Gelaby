import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseModel, CreateCourseModel, UpdateCourseModel } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  getCourses(): Observable<CourseModel[]> {
    const url = `${this.API_URL}/courses`;
    return this.httpClient.get<CourseModel[]>(url);
  }

  getCourseById(id: number): Observable<CourseModel> {
    const url = `${this.API_URL}/courses/${id}`;
    return this.httpClient.get<CourseModel>(url);
  }

  createCourse(data: CreateCourseModel): Observable<CourseModel> {
    const url = `${this.API_URL}/courses`;
    return this.httpClient.post<CourseModel>(url, data);
  }

  updateCourse(id: number, data: UpdateCourseModel): Observable<CourseModel> {
    const url = `${this.API_URL}/courses/${id}`;
    return this.httpClient.patch<CourseModel>(url, data);
  }

  deleteCourse(id: number): Observable<void> {
    const url = `${this.API_URL}/courses/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
