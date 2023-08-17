import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, delay, map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';
import {
  CreateUsersModel,
  UpdateUsersModel,
  UsersModel,
} from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  API_URL: string;
  isUserLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  getUsers(): Observable<UsersModel[]> {
    const url = `${this.API_URL}/users`;
    return this.httpClient.get<UsersModel[]>(url);
  }

  getUserById(id: number): Observable<UsersModel> {
    const url = `${this.API_URL}/users/${id}`;
    return this.httpClient.get<UsersModel>(url);
  }

  findByUsername(username: string): Observable<UsersModel> {
    const url = `${this.API_URL}/users/username/${username}`;
    return this.httpClient.get<UsersModel>(url);
  }

  findByPassword(password: string): Observable<UsersModel> {
    const url = `${this.API_URL}/users/password/${password}`;
    return this.httpClient.get<UsersModel>(url);
  }

  createUser(data: CreateUsersModel): Observable<UsersModel> {
    const url = `${this.API_URL}/users`;
    return this.httpClient.post<UsersModel>(url, data);
  }

  updateUser(id: number, data: UpdateUsersModel): Observable<UsersModel> {
    const url = `${this.API_URL}/users/${id}`;
    return this.httpClient.patch<UsersModel>(url, data);
  }

  deleteUser(id: number): Observable<void> {
    const url = `${this.API_URL}/users/${id}`;
    return this.httpClient.delete<void>(url);
  }

  login(username: string, password: string): Observable<boolean> {
    return this.findByUsername(username).pipe(
      tap((user) => {
        if (user && user.user_password === password) {
          // Alerta de inicio de sesión exitoso
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: '¡Bienvenido! ' + user.user_fullname,
            showConfirmButton: false,
            timer: 1000,
          });
          this.isUserLoggedIn = true;
          localStorage.setItem('isUserLoggedIn', 'true');
        } else {
          // Alerta de error de inicio de sesión
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Credenciales inválidas',
            showConfirmButton: false,
            timer: 1000,
          });
          this.isUserLoggedIn = false;
          localStorage.setItem('isUserLoggedIn', 'false');
        }
      }),
      delay(1000),
      tap((val) => {
        //console.log('Is User Authentication successful: ' + val);
      }),
      map(() => this.isUserLoggedIn)
    );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
  }

  forgotPassword(username: string): Observable<boolean> {
    const url = `${this.API_URL}/users/forgot-password`;
    const data = {
      username: username,
    };

    return this.httpClient.post<boolean>(url, data).pipe(
      map(() => true), // Indica que la solicitud se envió correctamente
      catchError(() => of(false)) // Maneja el error en caso de fallo en la solicitud
    );
    // Aquí realizarías la lógica para enviar la solicitud de recuperación de contraseña
    // Puedes hacer una solicitud HTTP al backend o utilizar otro método de tu elección
    // Por simplicidad, aquí se devuelve simplemente un valor booleano

    // Realiza las operaciones necesarias y devuelve un valor booleano que indique el éxito o el fallo
    const success = true; // Indica que la solicitud se envió correctamente

    return of(success);
  }
}
