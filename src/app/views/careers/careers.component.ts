import { Component } from '@angular/core';
import { CareerModel } from 'src/app/models/career.model';
import { CareersService } from 'src/app/services/careers.service';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css'],
})
export class CareersComponent {
  title: string = 'Carreras';
  Careers: CareerModel[] = [];

  constructor(private apiService: CareersService) {
    this.getCareers();
  }

  getCareers(): void {
    this.apiService.getCareers().subscribe(
      (response) => {
        this.Careers = response;
        // console.log(response);
      },
      (error) => {
        console.error('Error al obtener las carreras:', error);
      }
    );
  }

  deleteCareer(id: CareerModel['career_id']) {
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
        this.apiService.deleteCareer(id).subscribe(
          () => {
            // Eliminar el elemento del arreglo de careers
            this.Careers = this.Careers.filter(
              (career) => career.career_id !== id
            );
            // Mostrar una alerta de éxito después de eliminar
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Carrera eliminada exitosamente!',
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
              text: 'Ocurrió un error al eliminar la carrera!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
      }
    });
  }

  exportToPDF() {
    if (this.Careers.length <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay carreras disponibles para exportar.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // Crea una nueva instancia de jsPDF
    const doc = new jsPDF.default();

    // Agrega el título al PDF
    const title = 'Reporte de Carreras';
    const fontSize = 30;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth =
      (doc.getStringUnitWidth(title) * fontSize) / doc.internal.scaleFactor;
    const titleX = (pageWidth - textWidth) / 2;
    const titleY = 20;

    doc.setFontSize(fontSize);
    doc.text(title, titleX, titleY);

    // Obtén los datos de la tabla
    const tableData = this.Careers.map((career, index) => [
      career.career_id,
      career.career_name,
      career.career_acronym,
      career.career_duration,
    ]);

    // Define las columnas de la tabla
    const headers = [['Id', 'Nombre', 'Siglas', 'Semestres']];

    // Establece la posición inicial de la tabla
    const startY = titleY + 10;

    // Genera el contenido de la tabla
    (doc as any).autoTable({
      head: headers,
      body: tableData,
      startY: startY,
    });

    // Guarda el PDF con un nombre de archivo
    doc.save('carreras.pdf');
  }
}
