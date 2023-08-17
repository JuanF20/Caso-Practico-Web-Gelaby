import { Component } from '@angular/core';
import { TeacherModel } from 'src/app/models/teacher.model';
import { TeachersService } from 'src/app/services/teachers.service';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {
  title: string = 'Docentes';
  Teachers: TeacherModel[] = [];

  constructor(private apiService: TeachersService) {
    this.getTeachers();
  }

  getTeachers(): void {
    this.apiService.getTeachers().subscribe(
      (response) => {
        this.Teachers = response;
        //console.log("AAAAAAAHHHHHHHHH");
        //console.log(response);
      },
      (error) => {
        console.error('Error al obtener los temas:', error);
      }
    );
  }

  deleteTeacher(id: TeacherModel['teacher_id']) {
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
        this.apiService.deleteTeacher(id).subscribe(
          () => {
            // Eliminar el elemento del arreglo de teachers
            this.Teachers = this.Teachers.filter(
              (teacher) => teacher.teacher_id !== id
            );
            // Mostrar una alerta de éxito después de eliminar
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Docente eliminado exitosamente!',
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
              text: 'Ocurrió un error al eliminar el docente!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
      }
    });
  }


exportToPDF() {
  if (this.Teachers.length <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No hay docentes disponibles para exportar.',
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  // Crea una nueva instancia de jsPDF
  const doc = new jsPDF.default();

  // Agrega el título al PDF
  const title = 'Reporte de Docentes';
  const fontSize = 30;
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth =
    (doc.getStringUnitWidth(title) * fontSize) / doc.internal.scaleFactor;
  const titleX = (pageWidth - textWidth) / 2;
  const titleY = 20;

  doc.setFontSize(fontSize);
  doc.text(title, titleX, titleY);

  // Obtén los datos de la tabla
  const tableData = this.Teachers.map((teacher) => [
    teacher.teacher_identification,
    teacher.teacher_first_name,
    teacher.teacher_last_name,
    teacher.teacher_institutional_email,
    teacher.teacher_phone_number,
  ]);

  // Define las columnas de la tabla
  const headers = [
    [
      'Cédula',
      'Nombre',
      'Apellidos',
      'Correo Institucional',
      'Teléfono',
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
  doc.save('docentes.pdf');
}

  
}
