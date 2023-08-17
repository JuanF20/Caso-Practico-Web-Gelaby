import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateLaboratoriesStatusModel, LaboratoriesStatusModel, UpdateLaboratoriesStatusModel } from '../models/laboratories-status.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratoriesStatusService {
//laboratory-status
  API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  getLaboratoryStatuses(): Observable<LaboratoriesStatusModel[]> {
    const url = `${this.API_URL}/laboratory-status`;
    return this.httpClient.get<LaboratoriesStatusModel[]>(url);
  }

  getLaboratoryStatusById(id: number): Observable<LaboratoriesStatusModel> {
    const url = `${this.API_URL}/laboratory-status/${id}`;
    return this.httpClient.get<LaboratoriesStatusModel>(url);
  }

  createLaboratoryStatus(data: CreateLaboratoriesStatusModel): Observable<LaboratoriesStatusModel> {
    const url = `${this.API_URL}/laboratory-status`;
    return this.httpClient.post<LaboratoriesStatusModel>(url, data);
  }

  updateLaboratoryStatus(id: number, data: UpdateLaboratoriesStatusModel): Observable<LaboratoriesStatusModel> {
    const url = `${this.API_URL}/laboratory-status/${id}`;
    return this.httpClient.patch<LaboratoriesStatusModel>(url, data);
  }

  deleteLaboratoryStatus(id: number): Observable<void> {
    const url = `${this.API_URL}/laboratory-status/${id}`;
    return this.httpClient.delete<void>(url);
  }

}
