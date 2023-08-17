import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModel } from 'src/app/models/course.model';
import { SubjectModel } from 'src/app/models/subject.model';
import { TeacherModel } from 'src/app/models/teacher.model';
import { UpdateTeachersDetailsModel } from 'src/app/models/teachers-details.model';
import { CoursesService } from 'src/app/services/courses.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TeachersDetailsService } from 'src/app/services/teachers-details.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-teachers-details',
  templateUrl: './edit-teachers-details.component.html',
  styleUrls: ['./edit-teachers-details.component.css'],
  providers: [DatePipe],
})
export class EditTeachersDetailsComponent {
  title: string = 'Editar Detalle';
  Subjects: SubjectModel[] = [];
  Courses: CourseModel[] = [];
  Teachers: TeacherModel[] = [];
  TeacherDetails: UpdateTeachersDetailsModel = {
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
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.Subjects = [];
    this.Courses = [];
    this.Teachers = [];
    this.getSubjects();
    this.getCourses();
    this.getTeachers();
  }

  ngOnInit(): void {
    // Obtener el ID del detalle del profesor desde la ruta o de alguna otra manera
    this.getTeacherDetail();
  }

  getTeacherDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const teacherDetailId = parseInt(id);
      // Convertir id a un número entero
      this.apiService.getTeacherDetailById(teacherDetailId).subscribe(
        (response) => {
          this.TeacherDetails = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
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

  updateTeacherDetail(): void {
    if (
      this.TeacherDetails.teacher_detail_id !== undefined &&
      this.TeacherDetails.teacher_detail_date !== undefined &&
      this.TeacherDetails.teacher_detail_start_time !== undefined &&
      this.TeacherDetails.teacher_detail_end_time !== undefined &&
      this.TeacherDetails.teacher !== undefined &&
      this.TeacherDetails.subject !== undefined &&
      this.TeacherDetails.course !== undefined
    ) {
      this.apiService
        .updateTeacherDetail(
          this.TeacherDetails.teacher_detail_id,
          this.TeacherDetails
        )
        .subscribe(
          (response) => {
            console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Detalle de docente actualizado exitosamente!',
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              this.router.navigate(['/teachers-details']);
            });
          },
          (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al actualizar el detalle de docente!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
    }
  }

  compareSubjects(subject1: any, subject2: any): boolean {
    return subject1 && subject2
      ? subject1.subject_id === subject2.subject_id
      : subject1 === subject2;
  }

  compareCourses(course1: any, course2: any): boolean {
    return course1 && course2
      ? course1.course_id === course2.course_id
      : course1 === course2;
  }

  compareTeachers(teacher1: any, teacher2: any): boolean {
    return teacher1 && teacher2
      ? teacher1.teacher_id === teacher2.teacher_id
      : teacher1 === teacher2;
  }
}
