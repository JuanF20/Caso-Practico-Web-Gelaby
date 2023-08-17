import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateCareerModel } from 'src/app/models/career.model';
import { CareersService } from 'src/app/services/careers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-careers',
  templateUrl: './create-careers.component.html',
  styleUrls: ['./create-careers.component.css'],
})
export class CreateCareersComponent {
  title: string = 'Crear Carrera';
  Careers: CreateCareerModel = {
    career_name: '',
    career_acronym: '',
    career_duration: 0,
  };

  constructor(private apiService: CareersService, private router: Router) {}

  createCareer() {
    const data = {
      career_name: this.Careers.career_name,
      career_acronym: this.Careers.career_acronym,
      career_duration: this.Careers.career_duration,
    };

    this.apiService.createCareer(data).subscribe(
      (response) => {
        //console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Asignatura registrada exitosamente!',
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.router.navigate(['/careers']);
        });
        this.router.navigate(['/careers']);
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar la asignatura!',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    );
  }
}
