import { Injectable } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate {
  constructor(private router: Router, private apiService: UsersService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const token = route.queryParams['token']; // Obtener el token de los parámetros de la URL
    
    if (token) {
      // Validar si el token se encuentra en la base de datos
      return this.apiService.findByPassword(token).pipe(
        map((response) => {
          if (response != null) {
            // Si el token se encuentra en la base de datos, permitir el acceso
            return true;
          } else {
            // Si el token no se encuentra en la base de datos, redirigir a otra página
            this.router.navigate(['/']);
            return false;
          }
        }),
        catchError((error) => {
          console.error(error);
          // Manejar el error en caso de fallo en la solicitud
          // Redirigir a otra página o mostrar un mensaje de error, según corresponda
          this.router.navigate(['/']);
          return of(false);
        })
      );
    } else {
      // Si no se recibe un token, redirigir a otra página
      this.router.navigate(['/']);
      return of(false);
    }
  }
}
