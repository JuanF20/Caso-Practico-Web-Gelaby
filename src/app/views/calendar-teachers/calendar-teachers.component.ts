import { Component } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { TeachersDetailsModel } from 'src/app/models/teachers-details.model';
import { TeachersDetailsService } from 'src/app/services/teachers-details.service';
import Swal from 'sweetalert2';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar-teachers',
  templateUrl: './calendar-teachers.component.html',
  styleUrls: ['./calendar-teachers.component.css'],
})
export class CalendarTeachersComponent {
  title: string = 'Celendario de Docentes';
  TeacherDetails: TeachersDetailsModel[] = [];

  constructor(private apiService: TeachersDetailsService) {
    this.getTeacherDetails();
  }

  getTeacherDetails(): void {
    this.apiService.getTeacherDetails().subscribe(
      (response) => {
        this.TeacherDetails = response;
        this.renderCalendar();
      },
      (error) => {
        console.error('Error al obtener los detalles de los docentes:', error);
      }
    );
  }

  renderCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
      const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, listPlugin, timeGridPlugin],
        events: this.getEvents(),
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        initialView: 'dayGridMonth',
        selectable: true,
        eventClick: (info) => {
          const event = info.event;
          const title = event.title;
          const { date, time_start, time_end, subject, course, teacher } = event.extendedProps;

  
          Swal.fire({
            title: title,
            html: `
              <strong>Fecha:</strong> ${date}<br>
              <strong>Hora inicio:</strong> ${time_start}<br>
              <strong>Hora Fin:</strong> ${time_end}<br>
              <strong>Asignatura:</strong> ${subject}<br>
              <strong>Curso:</strong> ${course}<br>
              <strong>Profesor:</strong> ${teacher}<br>
            `,
            icon: 'info',
            confirmButtonText: 'OK',
          });
        },
        locale: esLocale,

        // Otras opciones de configuración del calendario
      });

      calendar.render();
    }
  }

  getEvents() {
    const events = this.TeacherDetails.map((teacherDetail) => {
      const teacher = teacherDetail.teacher?.teacher_first_name
        ? teacherDetail.teacher.teacher_first_name +
          ' ' +
          teacherDetail.teacher.teacher_last_name
        : '';
      const start = new Date(
        teacherDetail.teacher_detail_date +
          ' ' +
          teacherDetail.teacher_detail_start_time
      );
      const end = new Date(
        teacherDetail.teacher_detail_date +
          ' ' +
          teacherDetail.teacher_detail_end_time
      );

      // Formatea la descripción del evento con el nombre del docente, asignatura y curso
      const title = `Asignacion Docente Nº ${teacherDetail.teacher_detail_id}`;

      return {
        title: title,
        start: start,
        end: end,
        extendedProps: {
          date: teacherDetail.teacher_detail_date,
          time_start: teacherDetail.teacher_detail_start_time,
          time_end:teacherDetail.teacher_detail_end_time,
          subject: teacherDetail.subject?.subject_name || '',
          course: teacherDetail.course?.course_name || '',
          teacher: teacher,
        },
      };
    });

    return events;
  }
}
