import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateLaboratoriesStatusModel } from 'src/app/models/laboratories-status.model';
import { LaboratoriesModel } from 'src/app/models/laboratories.model';
import { LaboratoriesStatusService } from 'src/app/services/laboratories-status.service';
import { LaboratoriesService } from 'src/app/services/laboratories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-laboratories-status',
  templateUrl: './edit-laboratories-status.component.html',
  styleUrls: ['./edit-laboratories-status.component.css'],
})
export class EditLaboratoriesStatusComponent {
  title: string = 'Editar Estado Laboratorio';
  Laboratories: LaboratoriesModel[] = [];
  LaboratoriesStatus: UpdateLaboratoriesStatusModel = {
    lab_status_id: 0,
    lab_status_detail: '',
    lab_status_date: '',
    lab_status_notes: '',
    laboratory: '',
  };

  constructor(
    private apiService: LaboratoriesStatusService,
    private apiLaboratoriesService: LaboratoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.Laboratories = [];
    this.getLaboratories();
  }

  ngOnInit(): void {
    // Obtener el ID del estado de laboratorio desde la ruta o de alguna otra manera
    this.getLaboratoryStatus();
  }

  getLaboratoryStatus(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const laboratoryStatusId = parseInt(id);
      // Convertir el ID a un número entero
      this.apiService.getLaboratoryStatusById(laboratoryStatusId).subscribe(
        (response) => {
          this.LaboratoriesStatus = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
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

  updateLaboratoryStatus(): void {
    if (
      this.LaboratoriesStatus.lab_status_id !== undefined &&
      this.LaboratoriesStatus.lab_status_date !== undefined &&
      this.LaboratoriesStatus.laboratory !== undefined &&
      this.LaboratoriesStatus.lab_status_detail !== undefined &&
      this.LaboratoriesStatus.lab_status_notes !== undefined
    ) {
      this.apiService
        .updateLaboratoryStatus(
          this.LaboratoriesStatus.lab_status_id,
          this.LaboratoriesStatus
        )
        .subscribe(
          (response) => {
            console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Estado de laboratorio actualizado exitosamente!',
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              this.router.navigate(['/laboratories-status']);
            });
          },
          (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al actualizar el estado de laboratorio!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
    }
  }

  compareLaboratory(laboratory1: any, laboratory2: any): boolean {
    return laboratory1 && laboratory2
      ? laboratory1.lab_id === laboratory2.lab_id
      : laboratory1 === laboratory2;
  }

}
