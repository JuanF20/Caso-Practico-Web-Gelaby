import { Component } from '@angular/core';
import { CourseModel } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  title: string = 'Cursos';
  Courses: CourseModel[] = [];

  constructor(private apiService: CoursesService) {
    this.getCourses();
  }

  getCourses(): void {
    this.apiService.getCourses().subscribe(
      (response) => {
        this.Courses = response;
        //console.log(response);
      },
      (error) => {
        console.error('Error al obtener las carreras:', error);
      }
    );
  }

  deleteCourse(id: CourseModel['course_id']) {
    // Muestra una alerta de confirmación antes de eliminar
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el elemento seleccionado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó la eliminación
        this.apiService.deleteCourse(id).subscribe(
          () => {
            // Eliminar el elemento del arreglo de Courses
            this.Courses = this.Courses.filter(
              (course) => course.course_id !== id
            );
            // Mostrar una alerta de éxito después de eliminar
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Curso eliminado exitosamente!',
              showConfirmButton: false,
              timer: 1000,
            });
          },
          (error) => {
            console.error(error);
            // Mostrar una alerta de error en caso de fallo en la eliminación
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al eliminar el curso!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
      }
    });
  }
  
  
  exportToPDF() {
    if (this.Courses.length <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay cursos disponibles para exportar.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
  
    // Crea una nueva instancia de jsPDF
    const doc = new jsPDF.default();
  
    // Agrega el título al PDF
    const title = 'Reporte de Cursos';
    const fontSize = 30;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth =
      (doc.getStringUnitWidth(title) * fontSize) / doc.internal.scaleFactor;
    const titleX = (pageWidth - textWidth) / 2;
    const titleY = 20;
  
    doc.setFontSize(fontSize);
    doc.text(title, titleX, titleY);
  
    // Obtén los datos de la tabla
    const tableData = this.Courses.map((course, index) => [
      course.course_id,
      course.course_name,
      course.course_students,
      course.course_duration,
      course.career?.career_name,
      course.course_parallel,
      course.course_shift,
    ]);
  
    // Define las columnas de la tabla
    const headers = [
      [
        'Id',
        'Nombre',
        'Estudiantes',
        'Semestres',
        'Carrera',
        'Paralelo',
        'Jornada',
      ],
    ];
  
    // Establece la posición inicial de la tabla
    const startY = titleY + 10;
  
    // Genera el contenido de la tabla
    (doc as any).autoTable({
      head: headers,
      body: tableData,
      startY: startY,
    });
  
    // Guarda el PDF con un nombre de archivo
    doc.save('cursos.pdf');
  }
  

}
