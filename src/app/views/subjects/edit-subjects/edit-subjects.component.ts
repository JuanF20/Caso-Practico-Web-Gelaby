import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectsService } from 'src/app/services/subjects.service';
import { UpdateSubjectModel } from 'src/app/models/subject.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-subjects',
  templateUrl: './edit-subjects.component.html',
  styleUrls: ['./edit-subjects.component.css'],
})
export class EditSubjectsComponent {
  title: string = 'Editar asignatura';
  Subject: UpdateSubjectModel = {};

  constructor(
    private apiService: SubjectsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la asignatura desde la ruta o de alguna otra manera
    this.getSubject();
  }

  getSubject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const subjectId = parseInt(id);
      // Convertir id a un número entero
      this.apiService.getSubjectById(subjectId).subscribe(
        (response) => {
          this.Subject = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  updateSubject(): void {
    if (
      this.Subject.subject_id !== undefined &&
      this.Subject.subject_name !== undefined &&
      this.Subject.subject_credits !== undefined
    ) {
      if (
        this.Subject.subject_name.length < 3 ||
        this.Subject.subject_name.length > 20
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre de la asignatura debe tener entre 3 y 20 caracteres!',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      if (
        this.Subject.subject_credits <= 0 ||
        this.Subject.subject_credits > 100
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Los creditos de la asignatura debe ser mayores a 0 y menores a 100!',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      this.apiService
        .updateSubject(this.Subject.subject_id, this.Subject)
        .subscribe(
          (response) => {
            console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Asignatura actualizada exitosamente!',
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              this.router.navigate(['/subjects']);
            });
          },
          (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al actualizar la asignatura!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
    }
  }
}
