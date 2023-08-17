import { Component } from '@angular/core';
import { SubjectModel } from 'src/app/models/subject.model';
import { SubjectsService } from 'src/app/services/subjects.service';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent {
  title: string = 'Asignaturas';
  subjects: SubjectModel[] = [];

  constructor(private apiService: SubjectsService) {
    this.getSubjects();
  }

  getSubjects(): void {
    this.apiService.getSubjects().subscribe(
      (response) => {
        this.subjects = response;
        //console.log(response);
      },
      (error) => {
        console.error('Error al obtener los temas:', error);
      }
    );
  }

  deleteSubject(id: SubjectModel['subject_id']) {
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
        this.apiService.deleteSubject(id).subscribe(
          () => {
            // Eliminar el elemento del arreglo de subjects
            this.subjects = this.subjects.filter(
              (subject) => subject.subject_id !== id
            );
            // Mostrar una alerta de éxito después de eliminar
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Asignatura eliminada exitosamente!',
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
              text: 'Ocurrió un error al eliminar la asignatura!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
      }
    });
  }


exportToPDF() {
  if (this.subjects.length <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No hay asignaturas disponibles para exportar.',
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  // Crea una nueva instancia de jsPDF
  const doc = new jsPDF.default();

  // Agrega el título al PDF
  const title = 'Reporte de Asignaturas';
  const fontSize = 30;
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth =
    (doc.getStringUnitWidth(title) * fontSize) / doc.internal.scaleFactor;
  const titleX = (pageWidth - textWidth) / 2;
  const titleY = 20;

  doc.setFontSize(fontSize);
  doc.text(title, titleX, titleY);

  // Obtén los datos de la tabla
  const tableData = this.subjects.map((subject, index) => [
    subject.subject_id,
    subject.subject_name,
    subject.subject_credits,
  ]);

  // Define las columnas de la tabla
  const headers = [['Id', 'Asignaturas', 'Créditos']];

  // Establece la posición inicial de la tabla
  const startY = titleY + 10;

  // Genera el contenido de la tabla
  (doc as any).autoTable({
    head: headers,
    body: tableData,
    startY: startY,
  });

  // Guarda el PDF con un nombre de archivo
  doc.save('asignaturas.pdf');
}

}
