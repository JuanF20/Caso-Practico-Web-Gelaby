import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseModel } from 'src/app/models/course.model';
import { SubjectModel } from 'src/app/models/subject.model';
import { TeacherModel } from 'src/app/models/teacher.model';
import { TeachersDetailsModel } from 'src/app/models/teachers-details.model';
import { CoursesService } from 'src/app/services/courses.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TeachersDetailsService } from 'src/app/services/teachers-details.service';
import { TeachersService } from 'src/app/services/teachers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-teachers-details',
  templateUrl: './create-teachers-details.component.html',
  styleUrls: ['./create-teachers-details.component.css'],
})
export class CreateTeachersDetailsComponent {
  title: string = 'Nuevo Detalle';
  Subjects: SubjectModel[] = [];
  Courses: CourseModel[] = [];
  Teachers: TeacherModel[] = [];
  TeacherDetails: TeachersDetailsModel = {
    teacher_detail_id: 0,
    teacher_detail_date: '',
    teacher_detail_start_time: '',
    teacher_detail_end_time: '',
    teacher: '',
    subject: '',
    course: '',
  };

  constructor(
    private apiService: TeachersDetailsService,
    private apiSubjectsService: SubjectsService,
    private apiCourseService: CoursesService,
    private apiTeacherService: TeachersService,
    private router: Router
  ) {
    this.Subjects = [];
    this.Courses = [];
    this.Teachers = [];
    this.getSubjects();
    this.getCourses();
    this.getTeachers();
  }

  getSubjects(): void {
    this.apiSubjectsService.getSubjects().subscribe(
      (response) => {
        this.Subjects = response;
        //console.log(response);
      },
      (error) => {
        console.error('Error al obtener los temas:', error);
      }
    );
  }

  getCourses(): void {
    this.apiCourseService.getCourses().subscribe(
      (response) => {
        this.Courses = response;
        //console.log(response);
      },
      (error) => {
        console.error('Error al obtener las carreras:', error);
      }
    );
  }

  getTeachers(): void {
    this.apiTeacherService.getTeachers().subscribe(
      (response) => {
        this.Teachers = response;
        //console.log(response);
      },
      (error) => {
        console.error('Error al obtener los temas:', error);
      }
    );
  }

  createTeacherDetail() {
    const data = {
      teacher_detail_date: this.TeacherDetails.teacher_detail_date,
      teacher_detail_start_time: this.TeacherDetails.teacher_detail_start_time,
      teacher_detail_end_time: this.TeacherDetails.teacher_detail_end_time,
      teacher: this.TeacherDetails.teacher as number,
      subject: this.TeacherDetails.subject as number,
      course: this.TeacherDetails.course as number,
    };

    this.apiService.createTeacherDetail(data).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Detalle de docente registrado exitosamente!',
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.router.navigate(['/teachers-details']);
        });
        this.router.navigate(['/teachers-details']);
      },
      (error) => {
        console.error(error);
        const errorMessage =
          error.error?.message ||
          'Ocurrió un error al registrar el detalle de docente!';
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
