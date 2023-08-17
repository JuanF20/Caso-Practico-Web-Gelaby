import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUsersModel } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  title: string = 'Registrarse';
  Users: CreateUsersModel = {
    user_fullname: '',
    user_username: '',
    user_email: '',
    user_password: '',
    user_role: '',
  };

  constructor(private apiService: UsersService, private router: Router) {}

  registerUser() {
    const user = {
      user_fullname: this.Users.user_fullname,
      user_username: this.Users.user_username,
      user_email: this.Users.user_email,
      user_password: this.Users.user_password,
      user_role: 'Usuario',
    };

    // Verificar si el nombre de usuario ya existe
    this.apiService.findByUsername(this.Users.user_username).subscribe(
      (existingUser) => {
        if (existingUser) {
          // El nombre de usuario ya está registrado
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre de usuario ya está registrado',
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          // El nombre de usuario no existe, realizar el registro
          this.apiService.createUser(user).subscribe(
            () => {
              // Registro exitoso
              Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: '¡Usuario registrado correctamente!',
                showConfirmButton: false,
                timer: 1000,
              }).then(() => {
                this.router.navigate(['/login']);
              });
              this.router.navigate(['/login']);
            },
            (error) => {
              console.error(error);
              // Error de registro
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al registrar al usuario',
                showConfirmButton: false,
                timer: 1000,
              });
            }
          );
        }
      },
      (error) => {
        console.error(error);
        // Error al verificar el nombre de usuario
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al verificar el nombre de usuario',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    );
  }
}
