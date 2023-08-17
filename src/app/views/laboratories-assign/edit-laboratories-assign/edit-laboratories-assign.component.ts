import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateLaboratoriesAssignModel } from 'src/app/models/laboratories-assign.model';
import { LaboratoriesModel } from 'src/app/models/laboratories.model';
import { TeacherModel } from 'src/app/models/teacher.model';
import { LaboratoriesAssignService } from 'src/app/services/laboratories-assign.service';
import { LaboratoriesService } from 'src/app/services/laboratories.service';
import { TeachersService } from 'src/app/services/teachers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-laboratories-assign',
  templateUrl: './edit-laboratories-assign.component.html',
  styleUrls: ['./edit-laboratories-assign.component.css'],
})
export class EditLaboratoriesAssignComponent {
  title: string = 'Editar Asignacion Laboratorio';
  Laboratories: LaboratoriesModel[] = [];
  Teachers: TeacherModel[] = [];
  LaboratoriesAssign: UpdateLaboratoriesAssignModel = {
    lab_assign_description: '',
    lab_assign_date: '',
    laboratory: '',
    teacher: '',
  };

  constructor(
    private apiService: LaboratoriesAssignService,
    private apiLaboratoriesService: LaboratoriesService,
    private apiTeachersService: TeachersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.Laboratories = [];
    this.Teachers = [];
    this.getTeachers();
    this.getLaboratories();
  }

  ngOnInit(): void {
    // Obtener el ID del Assing de laboratorio desde la ruta o de alguna otra manera
    this.getLaboratoryAssign();
  }

  getLaboratoryAssign(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const laboratoryAssignId = parseInt(id);
      // Convertir el ID a un número entero
      this.apiService.getLaboratoryAssignById(laboratoryAssignId).subscribe(
        (response) => {
          this.LaboratoriesAssign = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  getTeachers(): void {
    this.apiTeachersService.getTeachers().subscribe(
      (response) => {
        this.Teachers = response;
      },
      (error) => {
        console.error('Error al obtener los temas:', error);
      }
    );
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

  updateLaboratoryAssign(): void {
    if (
      this.LaboratoriesAssign.lab_assign_id !== undefined &&
      this.LaboratoriesAssign.lab_assign_description !== undefined &&
      this.LaboratoriesAssign.lab_assign_date !== undefined &&
      this.LaboratoriesAssign.laboratory !== undefined &&
      this.LaboratoriesAssign.teacher !== undefined
    ) {
      this.apiService
        .updateLaboratoryAssign(
          this.LaboratoriesAssign.lab_assign_id,
          this.LaboratoriesAssign
        )
        .subscribe(
          (response) => {
            console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Asignación de laboratorio actualizada exitosamente!',
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              this.router.navigate(['/laboratories-assign']);
            });
            this.router.navigate(['/laboratories-assign']);
          },
          (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al actualizar la asignación de laboratorio!',
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

  compareTeachers(teacher1: any, teacher2: any): boolean {
    return teacher1 && teacher2
      ? teacher1.teacher_id === teacher2.teacher_id
      : teacher1 === teacher2;
  }
}
