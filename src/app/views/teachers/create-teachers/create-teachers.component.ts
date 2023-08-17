import { Component } from '@angular/core';
import { CreateTeacherModel } from 'src/app/models/teacher.model';
import { TeachersService } from 'src/app/services/teachers.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-teachers',
  templateUrl: './create-teachers.component.html',
  styleUrls: ['./create-teachers.component.css'],
})
export class CreateTeachersComponent {
  title: string = 'Crear Docente';
  Teachers: CreateTeacherModel = {
    teacher_identification: '',
    teacher_first_name: '',
    teacher_last_name: '',
    teacher_institutional_email: '',
    teacher_phone_number: '',
  };

  constructor(
    private apiService: TeachersService,
    private router: Router
  ) {}

  createTeacher() {
    const data = {
      teacher_identification: this.Teachers.teacher_identification,
      teacher_first_name: this.Teachers.teacher_first_name,
      teacher_last_name: this.Teachers.teacher_last_name,
      teacher_institutional_email: this.Teachers.teacher_institutional_email,
      teacher_phone_number: this.Teachers.teacher_phone_number,
    };
  
    this.apiService.createTeacher(data).subscribe(
      (response) => {
        //console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Profesor registrado exitosamente!',
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.router.navigate(['/teachers']);
        });
        this.router.navigate(['/teachers']);
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar el profesor!',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    );
  }
  
}
