import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CareerModel } from 'src/app/models/career.model';
import { CreateCourseModel } from 'src/app/models/course.model';
import { CareersService } from 'src/app/services/careers.service';
import { CoursesService } from 'src/app/services/courses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.css'],
})
export class CreateCoursesComponent {
  title: string = 'Crear Curso';
  Careers: CareerModel[] = [];
  Courses: CreateCourseModel = {
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

  createCourse() {
    const data = {
      course_name: this.Courses.course_name,
      course_students: this.Courses.course_students,
      course_duration: this.Courses.course_duration,
      career: this.Courses.career as number,
      course_parallel: this.Courses.course_parallel,
      course_shift: this.Courses.course_shift,
    };

    this.apiService.createCourse(data).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Curso registrado exitosamente!',
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.router.navigate(['/courses']);
        });
        this.router.navigate(['/courses']);
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar el curso!',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    );


    
  }
}
