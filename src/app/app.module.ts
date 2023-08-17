import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';

import { SubjectsComponent } from './views/subjects/subjects.component';
import { CreateSubjectsComponent } from './views/subjects/create-subjects/create-subjects.component';
import { EditSubjectsComponent } from './views/subjects/edit-subjects/edit-subjects.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './views/register/register.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { CareersComponent } from './views/careers/careers.component';
import { CreateCareersComponent } from './views/careers/create-careers/create-careers.component';
import { EditCareersComponent } from './views/careers/edit-careers/edit-careers.component';
import { CoursesComponent } from './views/courses/courses.component';
import { CreateCoursesComponent } from './views/courses/create-courses/create-courses.component';
import { EditCoursesComponent } from './views/courses/edit-courses/edit-courses.component';
import { TeachersComponent } from './views/teachers/teachers.component';
import { CreateTeachersComponent } from './views/teachers/create-teachers/create-teachers.component';
import { EditTeachersComponent } from './views/teachers/edit-teachers/edit-teachers.component';
import { TeachersDetailsComponent } from './views/teachers-details/teachers-details.component';
import { CreateTeachersDetailsComponent } from './views/teachers-details/create-teachers-details/create-teachers-details.component';
import { EditTeachersDetailsComponent } from './views/teachers-details/edit-teachers-details/edit-teachers-details.component';
import { LaboratoriesComponent } from './views/laboratories/laboratories.component';
import { CreateLaboratoriesComponent } from './views/laboratories/create-laboratories/create-laboratories.component';
import { EditLaboratoriesComponent } from './views/laboratories/edit-laboratories/edit-laboratories.component';
import { LaboratoriesStatusComponent } from './views/laboratories-status/laboratories-status.component';
import { CreateLaboratoriesStatusComponent } from './views/laboratories-status/create-laboratories-status/create-laboratories-status.component';
import { EditLaboratoriesStatusComponent } from './views/laboratories-status/edit-laboratories-status/edit-laboratories-status.component';
import { LaboratoriesAssignComponent } from './views/laboratories-assign/laboratories-assign.component';
import { CreateLaboratoriesAssignComponent } from './views/laboratories-assign/create-laboratories-assign/create-laboratories-assign.component';
import { EditLaboratoriesAssignComponent } from './views/laboratories-assign/edit-laboratories-assign/edit-laboratories-assign.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { UsersComponent } from './views/users/users.component';
import { CalendarLaboratoriesComponent } from './views/calendar-laboratories/calendar-laboratories.component';
import { CalendarTeachersComponent } from './views/calendar-teachers/calendar-teachers.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SubjectsComponent,
    CreateSubjectsComponent,
    EditSubjectsComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    CareersComponent,
    CreateCareersComponent,
    EditCareersComponent,
    CoursesComponent,
    CreateCoursesComponent,
    EditCoursesComponent,
    TeachersComponent,
    CreateTeachersComponent,
    EditTeachersComponent,
    TeachersDetailsComponent,
    CreateTeachersDetailsComponent,
    EditTeachersDetailsComponent,
    LaboratoriesComponent,
    CreateLaboratoriesComponent,
    EditLaboratoriesComponent,
    LaboratoriesStatusComponent,
    CreateLaboratoriesStatusComponent,
    EditLaboratoriesStatusComponent,
    LaboratoriesAssignComponent,
    CreateLaboratoriesAssignComponent,
    EditLaboratoriesAssignComponent,
    ResetPasswordComponent,
    UsersComponent,
    CalendarLaboratoriesComponent,
    CalendarTeachersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
