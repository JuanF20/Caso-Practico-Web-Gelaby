import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerModel } from 'src/app/models/career.model';
import { UpdateCourseModel } from 'src/app/models/course.model';
import { CareersService } from 'src/app/services/careers.service';
import { CoursesService } from 'src/app/services/courses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.css'],
})
export class EditCoursesComponent {
  title: string = 'Editar Curso';
  Careers: CareerModel[] = [];
  Course: UpdateCourseModel = {
    course_name: '',
    course_students: 0,
    course_duration: 0,
    career: '',
    course_parallel: '',
    course_shift: '',
  };

  constructor(
    private apiCareerService: CareersService,
    private apiService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.Careers = [];
    this.getCareers();
  }

  getCareers(): void {
    this.apiCareerService.getCareers().subscribe(
      (response) => {
        this.Careers = response;
        //console.log(response);
      },
      (error) => {
        console.error('Error al obtener las carreras:', error);
      }
    );
  }

  ngOnInit(): void {
    // Obtener el ID del curso desde la ruta o de alguna otra manera
    this.getCourse();
  }

  getCourse(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const courseId = parseInt(id);
      // Convertir id a un número entero
      this.apiService.getCourseById(courseId).subscribe(
        (response) => {
          this.Course = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  compareCareers(career1: any, career2: any): boolean {
    return career1 && career2 ? career1.career_id === career2.career_id : career1 === career2;
  }
  

  updateCourse(): void {
    if (
      this.Course.course_id !== undefined &&
      this.Course.course_name !== undefined &&
      this.Course.course_students !== undefined &&
      this.Course.course_duration !== undefined &&
      this.Course.course_parallel !== undefined &&
      this.Course.course_shift !== undefined
    ) {
      this.apiService
        .updateCourse(this.Course.course_id, this.Course)
        .subscribe(
          (response) => {
            console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Curso actualizado exitosamente!',
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              this.router.navigate(['/courses']);
            });
          },
          (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al actualizar el curso!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
    }
  }
}
