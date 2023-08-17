import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateLaboratoriesModel } from 'src/app/models/laboratories.model';
import { LaboratoriesService } from 'src/app/services/laboratories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-laboratories',
  templateUrl: './edit-laboratories.component.html',
  styleUrls: ['./edit-laboratories.component.css'],
})
export class EditLaboratoriesComponent {
  title: string = 'Editar Docente';
  Laboratories: UpdateLaboratoriesModel = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: LaboratoriesService
  ) {}

  ngOnInit(): void {
    this.getLaboratory();
  }

  getLaboratory(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const laboratoryrId = parseInt(id);
      // Convertir id a un número entero
      this.apiService.getLaboratoryById(laboratoryrId).subscribe(
        (response) => {
          this.Laboratories = response;
        },
        (error) => {
          console.error('Error al obtener el laboratorio:', error);
        }
      );
    }
  }

  updateLaboratory(): void {
    if (
      this.Laboratories.lab_id !== undefined &&
      this.Laboratories.lab_name !== undefined &&
      this.Laboratories.lab_computers !== undefined &&
      this.Laboratories.lab_description !== undefined
    ) {
      this.apiService.updateLaboratory(this.Laboratories.lab_id, this.Laboratories).subscribe(
        (response) => {
          console.log('Laboratorio actualizado:', response);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Laboratorio actualizado exitosamente!',
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            this.router.navigate(['/laboratories']);
          });
          this.router.navigate(['/laboratories']);
        },
        (error) => {
          console.error('Error al actualizar el laboratorio:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al actualizar el laboratorio!',
            showConfirmButton: false,
            timer: 1000,
          });
        }
      );
    }
  }
  
}
