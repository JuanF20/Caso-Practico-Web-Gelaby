import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateLaboratoriesAssignModel, LaboratoriesAssignModel, UpdateLaboratoriesAssignModel } from '../models/laboratories-assign.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratoriesAssignService {

  API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  getLaboratoriesAssign(): Observable<LaboratoriesAssignModel[]> {
    const url = `${this.API_URL}/laboratory-assign`;
    return this.httpClient.get<LaboratoriesAssignModel[]>(url);
  }

  getLaboratoryAssignById(id: number): Observable<LaboratoriesAssignModel> {
    const url = `${this.API_URL}/laboratory-assign/${id}`;
    return this.httpClient.get<LaboratoriesAssignModel>(url);
  }

  createLaboratoryAssign(data: CreateLaboratoriesAssignModel): Observable<LaboratoriesAssignModel> {
    const url = `${this.API_URL}/laboratory-assign`;
    return this.httpClient.post<LaboratoriesAssignModel>(url, data);
  }

  updateLaboratoryAssign(id: number, data: UpdateLaboratoriesAssignModel): Observable<LaboratoriesAssignModel> {
    const url = `${this.API_URL}/laboratory-assign/${id}`;
    return this.httpClient.patch<LaboratoriesAssignModel>(url, data);
  }

  deleteLaboratoryAssign(id: number): Observable<void> {
    const url = `${this.API_URL}/laboratory-assign/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
