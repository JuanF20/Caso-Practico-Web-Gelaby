import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateCareerModel } from 'src/app/models/career.model';
import { CareersService } from 'src/app/services/careers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-careers',
  templateUrl: './edit-careers.component.html',
  styleUrls: ['./edit-careers.component.css'],
})
export class EditCareersComponent {
  title: string = 'Editar Carrera';
  Careers: UpdateCareerModel = {};

  constructor(
    private apiService: CareersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la asignatura desde la ruta o de alguna otra manera
    this.getCareer();
  }

  getCareer(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const careersId = parseInt(id);
      // Convertir id a un número entero
      this.apiService.getCareerById(careersId).subscribe(
        (response) => {
          this.Careers = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  updateCareer(): void {
    if (
      this.Careers.career_id !== undefined &&
      this.Careers.career_name !== undefined &&
      this.Careers.career_acronym !== undefined &&
      this.Careers.career_duration !== undefined
    ) {
      this.apiService
        .updateCareer(this.Careers.career_id, this.Careers)
        .subscribe(
          (response) => {
            console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Carrera actualizada exitosamente!',
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              this.router.navigate(['/careers']);
            });
          },
          (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al actualizar la carrera!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
    }
  }
}
