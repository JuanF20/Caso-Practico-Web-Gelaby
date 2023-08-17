import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CareerModel, CreateCareerModel ,UpdateCareerModel } from '../models/career.model';

@Injectable({
  providedIn: 'root'
})
export class CareersService {
  API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  getCareers(): Observable<CareerModel[]> {
    const url = `${this.API_URL}/careers`;
    return this.httpClient.get<CareerModel[]>(url);
  }

  getCareerById(id: number): Observable<CareerModel> {
    const url = `${this.API_URL}/careers/${id}`;
    return this.httpClient.get<CareerModel>(url);
  }

  createCareer(data: CreateCareerModel): Observable<CareerModel> {
    const url = `${this.API_URL}/careers`;
    return this.httpClient.post<CareerModel>(url, data);
  }

  updateCareer(id: number, data: UpdateCareerModel): Observable<CareerModel> {
    const url = `${this.API_URL}/careers/${id}`;
    return this.httpClient.patch<CareerModel>(url, data);
  }

  deleteCareer(id: number): Observable<void> {
    const url = `${this.API_URL}/careers/${id}`;
    return this.httpClient.delete<void>(url);
  }

}
