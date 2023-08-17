import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TeachersDetailsModel } from 'src/app/models/teachers-details.model';
import { TeachersDetailsService } from 'src/app/services/teachers-details.service';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-teachers-details',
  templateUrl: './teachers-details.component.html',
  providers: [DatePipe],
  styleUrls: ['./teachers-details.component.css']
})
export class TeachersDetailsComponent {
  title: string = 'Detalles de Docentes';
  TeacherDetails: TeachersDetailsModel[] = [];

  constructor(private apiService: TeachersDetailsService,private datePipe: DatePipe) {
    this.getTeacherDetails();
  }

  getTeacherDetails(): void {
    this.apiService.getTeacherDetails().subscribe(
      (response) => {
        this.TeacherDetails = response;
      },
      (error) => {
        console.error('Error al obtener los detalles de los docentes:', error);
      }
    );
  }

  deleteTeacherDetail(id: TeachersDetailsModel['teacher_detail_id']) {
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
        this.apiService.deleteTeacherDetail(id).subscribe(
          () => {
            // Eliminar el elemento del arreglo de detalles de docentes
            this.TeacherDetails = this.TeacherDetails.filter(
              (detail) => detail.teacher_detail_id !== id
            );
            // Mostrar una alerta de éxito después de eliminar
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Detalle de docente eliminado exitosamente!',
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
              text: 'Ocurrió un error al eliminar el detalle de docente!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
      }
    });
  }

exportToPDF() {
  if (this.TeacherDetails.length <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No hay detalles de docentes disponibles para exportar.',
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  // Crea una nueva instancia de jsPDF
  const doc = new jsPDF.default();

  // Agrega el título al PDF
  const title = 'Reporte de Detalles de Docentes';
  const fontSize = 30;
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth =
    (doc.getStringUnitWidth(title) * fontSize) / doc.internal.scaleFactor;
  const titleX = (pageWidth - textWidth) / 2;
  const titleY = 20;

  doc.setFontSize(fontSize);
  doc.text(title, titleX, titleY);

  // Obtén los datos de la tabla
  const tableData = this.TeacherDetails.map((teacherDetail, index) => [
    index + 1,
    new Date(teacherDetail.teacher_detail_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    teacherDetail.teacher_detail_start_time,
    teacherDetail.teacher_detail_end_time,
    teacherDetail.subject?.subject_name,
    teacherDetail.course?.course_name,
    teacherDetail.teacher?.teacher_first_name
      ? teacherDetail.teacher.teacher_first_name +
        ' ' +
        teacherDetail.teacher.teacher_last_name
      : '',
  ]);

  // Define las columnas de la tabla
  const headers = [
    ['Nº', 'Fecha', 'Hora de inicio', 'Hora de fin', 'Asignatura', 'Curso', 'Profesor'],
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
  doc.save('detalles_docentes.pdf');
}


}
