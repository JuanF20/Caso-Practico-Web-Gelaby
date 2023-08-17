import { Component } from '@angular/core';
import { UsersModel } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  title: string = 'Usuarios';
  Users: UsersModel[] = [];

  constructor(private apiService: UsersService) {
    this.getUsers();
  }

  getUsers(): void {
    this.apiService.getUsers().subscribe(
      (response) => {
        this.Users = response;
        //console.log("AAAAAAAHHHHHHHHH");
        //console.log(response);
      },
      (error) => {
        console.error('Error al obtener los temas:', error);
      }
    );
  }

  deleteUser(id: UsersModel['user_id']) {
    // Muestra una alerta de confirmación antes de eliminar
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario seleccionado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó la eliminación
        this.apiService.deleteUser(id).subscribe(
          () => {
            // Eliminar el elemento del arreglo de usuarios
            this.Users = this.Users.filter((user) => user.user_id !== id);
            // Mostrar una alerta de éxito después de eliminar
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Usuario eliminado exitosamente!',
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
              text: 'Ocurrió un error al eliminar el usuario!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
      }
    });
  }

  exportToPDF() {
    if (this.Users.length <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay usuarios disponibles para exportar.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    // Crea una nueva instancia de jsPDF
    const doc = new jsPDF.default();

    // Agrega el título al PDF
    const title = 'Reporte de Usuarios';
    const fontSize = 30;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth =
      (doc.getStringUnitWidth(title) * fontSize) / doc.internal.scaleFactor;
    const titleX = (pageWidth - textWidth) / 2;
    const titleY = 20;

    doc.setFontSize(fontSize);
    doc.text(title, titleX, titleY);

    // Obtén los datos de la tabla
    const tableData = this.Users.map((user, index) => [
      index + 1,
      user.user_fullname,
      user.user_username,
      user.user_email,
      user.user_role,
    ]);

    // Define las columnas de la tabla
    const headers = [
      ['Nº', 'Nombre Completo', 'Usuario', 'Correo Institucional', 'Rol'],
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
    doc.save('usuarios.pdf');
  }
}
