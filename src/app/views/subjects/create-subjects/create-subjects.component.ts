import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectsService } from 'src/app/services/subjects.service';
import { CreateSubjectModel } from 'src/app/models/subject.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-subjects',
  templateUrl: './create-subjects.component.html',
  styleUrls: ['./create-subjects.component.css'],
})
export class CreateSubjectsComponent {
  title: string = 'Crear asignatura'; 
  Subject: CreateSubjectModel = {
    subject_name: '',
    subject_credits: 0
  };

  constructor(private apiService: SubjectsService, private router: Router) {}

  createSubject() {
     const data = {
      subject_name: this.Subject.subject_name,
      subject_credits: this.Subject.subject_credits,
    };

    if (this.Subject.subject_name.length < 3 || this.Subject.subject_name.length > 20 ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre de la asignatura debe tener entre 3 y 20 caracteres!',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (this.Subject.subject_credits < 0 || this.Subject.subject_credits > 100) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Los creditos de la asignatura debe ser mayores a 0 y menores a 100!',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }



    this.apiService.createSubject(data).subscribe(
      (response) => {
        //console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Asignatura registrada exitosamente!',
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.router.navigate(['/subjects']);
        });
        this.router.navigate(['/subjects']);
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar la asignatura!',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    );
  }


}
