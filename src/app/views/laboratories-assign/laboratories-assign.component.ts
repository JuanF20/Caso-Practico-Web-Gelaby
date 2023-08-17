import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { LaboratoriesAssignModel } from 'src/app/models/laboratories-assign.model';
import { LaboratoriesAssignService } from 'src/app/services/laboratories-assign.service';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-laboratories-assign',
  templateUrl: './laboratories-assign.component.html',
  styleUrls: ['./laboratories-assign.component.css'],
  providers: [DatePipe],
})
export class LaboratoriesAssignComponent {
  title: string = 'Asignacion de Laboratorios';
  LaboratoriesAssign: LaboratoriesAssignModel[] = [];

  constructor(
    private apiService: LaboratoriesAssignService,
    private datePipe: DatePipe
  ) {
    this.getLaboratoriesAssign();
  }

  getLaboratoriesAssign(): void {
    this.apiService.getLaboratoriesAssign().subscribe(
      (response) => {
        this.LaboratoriesAssign = response;
      },
      (error) => {
        console.error(
          'Error al obtener los detalles de los estados de laboratorio:',
          error
        );
      }
    );
  }

  deleteLaboratoryAssign(id: LaboratoriesAssignModel['lab_assign_id']) {
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
        this.apiService.deleteLaboratoryAssign(id).subscribe(
          () => {
            // Eliminar el elemento del arreglo de laboratories-assign
            this.LaboratoriesAssign = this.LaboratoriesAssign.filter(
              (assign) => assign.lab_assign_id !== id
            );
            // Mostrar una alerta de éxito después de eliminar
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Laboratorio asignado eliminado exitosamente!',
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
              text: 'Ocurrió un error al eliminar el laboratorio asignado!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
      }
    });
  }

  exportToPDF() {
    if (this.LaboratoriesAssign.length <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay asignaciones de laboratorio disponibles para exportar.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // Crea una nueva instancia de jsPDF
    const doc = new jsPDF.default();

    // Agrega el título al PDF
    const title = 'Reporte de Asignaciones de Laboratorios';
    const fontSize = 30;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth =
      (doc.getStringUnitWidth(title) * fontSize) / doc.internal.scaleFactor;
    const titleX = (pageWidth - textWidth) / 2;
    const titleY = 20;

    doc.setFontSize(fontSize);
    doc.text(title, titleX, titleY);

    // Obtén los datos de la tabla
    const tableData = this.LaboratoriesAssign.map((laboratoryAssign, index) => [
      laboratoryAssign.lab_assign_id,
      this.datePipe.transform(laboratoryAssign.lab_assign_date, 'EEEE dd MMMM yyyy'), // Format the date here
      laboratoryAssign.lab_assign_description,
      laboratoryAssign.laboratory?.lab_name || 'N/A',
      laboratoryAssign.teacher?.teacher_first_name
        ? laboratoryAssign.teacher.teacher_first_name +
          ' ' +
          laboratoryAssign.teacher.teacher_last_name
        : '',
    ]);

    // Define las columnas de la tabla
    const headers = [
      ['Nº', 'Fecha', 'Descripción', 'Laboratorio', 'Docente'],
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
    doc.save('asignaciones_de_laboratorios.pdf');
  }
  
}
