import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateLaboratoriesModel } from 'src/app/models/laboratories.model';
import { LaboratoriesService } from 'src/app/services/laboratories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-laboratories',
  templateUrl: './create-laboratories.component.html',
  styleUrls: ['./create-laboratories.component.css']
})
export class CreateLaboratoriesComponent {
  title: string = 'Crear Laboratorios';
  Laboratories: CreateLaboratoriesModel = {
    lab_name: '',
    lab_computers: 0,
    lab_description: ''
  };

  constructor(
    private apiService: LaboratoriesService,
    private router: Router
  ) {}

  createLaboratory() {
    const data = {
      lab_name: this.Laboratories.lab_name,
      lab_computers: this.Laboratories.lab_computers,
      lab_description: this.Laboratories.lab_description
    };
  
    this.apiService.createLaboratory(data).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Laboratorio registrado exitosamente!',
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          this.router.navigate(['/laboratories']);
        });
        this.router.navigate(['/laboratories']);
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar el laboratorio!',
          showConfirmButton: false,
          timer: 1000
        });
      }
    );
  }
  
}
