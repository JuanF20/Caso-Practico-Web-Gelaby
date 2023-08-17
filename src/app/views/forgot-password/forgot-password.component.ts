import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  title: string = '¿Olvidaste tu contraseña?';
  username!: string;

  constructor(private apiService: UsersService, private router: Router) {}

  forgotPassword() {
    // Validar el nombre de usuario antes de enviar la solicitud
    if (!this.username) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingresa un nombre de usuario válido.',
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    this.apiService.findByUsername(this.username).subscribe(
      (user) => {
        if (user) {
          const maskedEmail = this.maskEmail(user.user_email);
          // El nombre de usuario existe, enviar la solicitud de recuperación de contraseña
          this.apiService.forgotPassword(user.user_username).subscribe(
            (response) => {
              console.error("AAAAAAAAAAAAAAAAAAAAA");
              console.log(response);
              if (response === true) {
                Swal.fire({
                  icon: 'success',
                  title: 'Recuperación de contraseña',
                  text: `Se ha enviado un correo electrónico a ${maskedEmail} con instrucciones para restablecer tu contraseña.`,
                  showConfirmButton: false,
                  timer: 4000
                }).then(() => {
                  this.router.navigate(['/login']);
                });
                this.router.navigate(['/login']);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Recuperación de contraseña',
                  text: 'No se pudo enviar el correo electrónico de recuperación de contraseña. Por favor, inténtalo nuevamente.',
                  showConfirmButton: false,
                  timer: 4000
                });
              }
            },
            (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.',
                showConfirmButton: false,
                timer: 2000,
              });
              console.error(error);
            }
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre de usuario no existe. Por favor, verifica e intenta nuevamente.',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al verificar el nombre de usuario. Por favor, inténtalo de nuevo más tarde.',
          showConfirmButton: false,
          timer: 2000,
        });
        console.error(error);
      }
    );
  }
  // Función para enmascarar el correo electrónico
  maskEmail(email: string): string {
    const atIndex = email.indexOf('@');
    const maskedPart =
      email.substr(0, 1) + 'x'.repeat(atIndex - 2) + email.substr(atIndex - 1);
    return maskedPart;
  }
}
