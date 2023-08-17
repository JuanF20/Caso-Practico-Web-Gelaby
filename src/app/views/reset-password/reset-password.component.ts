import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUsersModel } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  title: string = 'Restablecer contraseña';
  Users: UpdateUsersModel = {};
  resetToken!: string;
  password!: string;
  confirmPassword!: string;

  constructor(
    private apiService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.resetToken = params['token'];
    });
  }

  resetPassword() {
    if (this.password != this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    this.apiService.findByPassword(this.resetToken).subscribe(
      (response) => {
        this.Users = response;
        //console.log(response);
        if (response != null) {
          const data: UpdateUsersModel = {
            user_password: this.password,
          };
          if (this.Users.user_id !== undefined)
            this.apiService.updateUser(this.Users.user_id, data).subscribe(
              (response) => {
                console.log(response);
                Swal.fire({
                  icon: 'success',
                  title: 'Éxito',
                  text: 'Contraseña actualizada exitosamente!',
                  showConfirmButton: false,
                  timer: 1000,
                }).then(() => {
                  // Aquí puedes redirigir al usuario a la página de inicio de sesión o a otra página relevante
                  this.router.navigate(['/login']);
                });
                this.router.navigate(['/login']);
              },
              (error) => {
                console.error(error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Ocurrió un error al actualizar la contraseña!',
                  showConfirmButton: false,
                  timer: 1000,
                });
              }
            );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al restablecer la contraseña. Por favor, inténtalo de nuevo.',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      },
      (error) => {
        console.error('AAAAAAAA');

        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al restablecer la contraseña. Por favor, inténtalo de nuevo.',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    );
  }
}
