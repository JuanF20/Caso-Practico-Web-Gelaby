import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateLaboratoriesAssignModel } from 'src/app/models/laboratories-assign.model';
import { LaboratoriesModel } from 'src/app/models/laboratories.model';
import { TeacherModel } from 'src/app/models/teacher.model';
import { LaboratoriesAssignService } from 'src/app/services/laboratories-assign.service';
import { LaboratoriesService } from 'src/app/services/laboratories.service';
import { TeachersService } from 'src/app/services/teachers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-laboratories-assign',
  templateUrl: './create-laboratories-assign.component.html',
  styleUrls: ['./create-laboratories-assign.component.css'],
  providers: [DatePipe],
})
export class CreateLaboratoriesAssignComponent {
  title: string = 'Nueva Asignacion Laboratorio';
  Laboratories: LaboratoriesModel[] = [];
  Teachers: TeacherModel[] = [];
  LaboratoriesAssign: CreateLaboratoriesAssignModel = {
    lab_assign_description: '',
    lab_assign_date: '',
    laboratory: '',
    teacher: '',
  };

  constructor(
    private apiService: LaboratoriesAssignService,
    private apiLaboratoriesService: LaboratoriesService,
    private apiTeachersService: TeachersService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.Laboratories = [];
    this.Teachers = [];
    this.getTeachers();
    this.getLaboratories();
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

  createLaboratoryAssign() {
    const data = {
      lab_assign_description: this.LaboratoriesAssign.lab_assign_description,
      lab_assign_date: this.LaboratoriesAssign.lab_assign_date,
      laboratory: this.LaboratoriesAssign.laboratory as number,
      teacher: this.LaboratoriesAssign.teacher as number,
    };

    this.apiService.createLaboratoryAssign(data).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Asignación de laboratorio registrada exitosamente!',
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.router.navigate(['/laboratories-assign']);
        });
        this.router.navigate(['/laboratories-assign']);
      },
      (error) => {
        console.error(error);
        const errorMessage =
          error.error?.message ||
          'Ocurrió un error al registrar la asignación de laboratorio!';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    );
  }
}
