
@Injectable({
  providedIn: 'root'
})
export class LaboratorisesService {

  constructor() { }
}




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateSubjectModel, SubjectModel, UpdateSubjectModel } from '../models/subject.model';
import { Observable } from 'rxjs';
import { CreateLaboratoriesModel, LaboratoriesModel, UpdateLaboratoriesModel } from '../models/laboratories.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratoriesService {
  API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  getLaboratories(): Observable<LaboratoriesModel[]> {
    const url = `${this.API_URL}/laboratories`;
    return this.httpClient.get<LaboratoriesModel[]>(url);
  }

  getLaboratoryById(id: number): Observable<LaboratoriesModel> {
    const url = `${this.API_URL}/laboratories/${id}`;
    return this.httpClient.get<LaboratoriesModel>(url);
  }

  createLaboratory(data: CreateLaboratoriesModel): Observable<LaboratoriesModel> {
    const url = `${this.API_URL}/laboratories`;
    return this.httpClient.post<LaboratoriesModel>(url, data);
  }

  updateLaboratory(id: number, data: UpdateLaboratoriesModel): Observable<LaboratoriesModel> {
    const url = `${this.API_URL}/laboratories/${id}`;
    return this.httpClient.patch<LaboratoriesModel>(url, data);
  }

  deleteLaboratory(id: number): Observable<void> {
    const url = `${this.API_URL}/laboratories/${id}`;
    return this.httpClient.delete<void>(url);
  }
}

