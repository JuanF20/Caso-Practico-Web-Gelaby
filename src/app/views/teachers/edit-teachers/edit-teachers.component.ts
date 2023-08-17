import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateTeacherModel } from 'src/app/models/teacher.model';
import { TeachersService } from 'src/app/services/teachers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-teachers',
  templateUrl: './edit-teachers.component.html',
  styleUrls: ['./edit-teachers.component.css']
})
export class EditTeachersComponent {
  title: string = 'Editar Docente';
  Teachers: UpdateTeacherModel = {};

  constructor(
    private apiService: TeachersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la asignatura desde la ruta o de alguna otra manera
    this.getTeacher();
  }

  getTeacher(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const teacherId = parseInt(id);
      // Convertir id a un número entero
      this.apiService.getTeacherById(teacherId).subscribe(
        (response) => {
          this.Teachers = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
  updateTeacher(): void {
    if (
      this.Teachers.teacher_id !== undefined &&
      this.Teachers.teacher_identification !== undefined &&
      this.Teachers.teacher_first_name !== undefined &&
      this.Teachers.teacher_last_name !== undefined &&
      this.Teachers.teacher_institutional_email !== undefined &&
      this.Teachers.teacher_phone_number !== undefined
    ) {
      this.apiService.updateTeacher(this.Teachers.teacher_id, this.Teachers).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Profesor actualizado exitosamente!',
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            this.router.navigate(['/teachers']);
          });
        },
        (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al actualizar el profesor!',
            showConfirmButton: false,
            timer: 1000,
          });
        }
      );
    }
  }
  
}
