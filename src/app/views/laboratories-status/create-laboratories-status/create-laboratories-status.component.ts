import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateLaboratoriesStatusModel } from 'src/app/models/laboratories-status.model';
import { LaboratoriesModel } from 'src/app/models/laboratories.model';
import { LaboratoriesStatusService } from 'src/app/services/laboratories-status.service';
import { LaboratoriesService } from 'src/app/services/laboratories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-laboratories-status',
  templateUrl: './create-laboratories-status.component.html',
  styleUrls: ['./create-laboratories-status.component.css']
})
export class CreateLaboratoriesStatusComponent {
  title: string = 'Nuevo Estado Laboratorio';
  Laboratories: LaboratoriesModel[] = [];
  LaboratoriesStatus: CreateLaboratoriesStatusModel = {
    lab_status_detail: '',
    lab_status_date: '',
    lab_status_notes: '',
    laboratory: ''
  };

  constructor(
    private apiService: LaboratoriesStatusService,
    private apiLaboratoriesService: LaboratoriesService,
    private router: Router
  ) {
    this.Laboratories = [];
    this.getLaboratories();
  }

  getLaboratories(): void {
    this.apiLaboratoriesService.getLaboratories().subscribe(
      (response) => {
        this.Laboratories = response;
      },
      (error) => {
        console.error('Error al obtener los laboratorios:', error);
      }
    );
  }
  
  createLaboratoryStatus() {
    const data = {
      lab_status_date: this.LaboratoriesStatus.lab_status_date,
      lab_status_detail: this.LaboratoriesStatus.lab_status_detail,
      lab_status_notes: this.LaboratoriesStatus.lab_status_notes,
      laboratory: this.LaboratoriesStatus.laboratory as number,
    };
  
    this.apiService.createLaboratoryStatus(data).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Estado de laboratorio registrado exitosamente!',
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.router.navigate(['/laboratories-status']);
        });
        this.router.navigate(['/laboratories-status']);
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar el estado de laboratorio!',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    );
  }
 
}
