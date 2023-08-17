import { Component } from '@angular/core';
import { LaboratoriesModel } from 'src/app/models/laboratories.model';
import { LaboratoriesService } from 'src/app/services/laboratories.service';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.component.html',
  styleUrls: ['./laboratories.component.css'],
})
export class LaboratoriesComponent {
  title: string = 'Laboratorios';
  Laboratories: LaboratoriesModel[] = [];

  constructor(private apiService: LaboratoriesService) {
    this.getLaboratories();
  }

  getLaboratories(): void {
    this.apiService.getLaboratories().subscribe(
      (response) => {
        this.Laboratories = response;
      },
      (error) => {
        console.error('Error al obtener los laboratorios:', error);
      }
    );
  }

  deleteLaboratory(id: LaboratoriesModel['lab_id']) {
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
        this.apiService.deleteLaboratory(id).subscribe(
          () => {
            // Eliminar el elemento del arreglo de laboratorios
            this.Laboratories = this.Laboratories.filter(
              (laboratory) => laboratory.lab_id !== id
            );
            // Mostrar una alerta de éxito después de eliminar
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Laboratorio eliminado exitosamente!',
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
              text: 'Ocurrió un error al eliminar el laboratorio!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
      }
    });
  }

  exportToPDF() {
    if (this.Laboratories.length <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay laboratorios disponibles para exportar.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // Crea una nueva instancia de jsPDF
    const doc = new jsPDF.default();

    // Agrega el título al PDF
    const title = 'Reporte de Laboratorios';
    const fontSize = 30;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth =
      (doc.getStringUnitWidth(title) * fontSize) / doc.internal.scaleFactor;
    const titleX = (pageWidth - textWidth) / 2;
    const titleY = 20;

    doc.setFontSize(fontSize);
    doc.text(title, titleX, titleY);

    // Obtén los datos de la tabla
    const tableData = this.Laboratories.map((laboratory, index) => [
      laboratory.lab_id,
      laboratory.lab_name,
      laboratory.lab_computers,
      laboratory.lab_description,
    ]);

    // Define las columnas de la tabla
    const headers = [['Nº', 'Nombre', 'Computadoras', 'Descripcion']];

    // Establece la posición inicial de la tabla
    const startY = titleY + 10;

    // Genera el contenido de la tabla
    (doc as any).autoTable({
      head: headers,
      body: tableData,
      startY: startY,
    });

    // Guarda el PDF con un nombre de archivo
    doc.save('laboratorios.pdf');
  }
}
