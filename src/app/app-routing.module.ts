import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseGuard } from './guards/auth.guards';
import { ResetPasswordGuard } from './guards/reset-password.guard';


import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { RegisterComponent } from './views/register/register.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { HomeComponent } from './views/home/home.component';

/*Subjects*/
import { SubjectsComponent } from './views/subjects/subjects.component';
import { CreateSubjectsComponent } from './views/subjects/create-subjects/create-subjects.component';
import { EditSubjectsComponent } from './views/subjects/edit-subjects/edit-subjects.component';

/*Careers*/
import { CareersComponent } from './views/careers/careers.component';
import { CreateCareersComponent } from './views/careers/create-careers/create-careers.component'; 
import { EditCareersComponent } from './views/careers/edit-careers/edit-careers.component'; 

/*Courses*/
import { CoursesComponent } from './views/courses/courses.component'; 
import { CreateCoursesComponent } from './views/courses/create-courses/create-courses.component';  
import { EditCoursesComponent } from './views/courses/edit-courses/edit-courses.component'; 

/*Teachers*/
import { TeachersComponent } from './views/teachers/teachers.component';  
import { CreateTeachersComponent } from './views/teachers/create-teachers/create-teachers.component';   
import { EditTeachersComponent } from './views/teachers/edit-teachers/edit-teachers.component'; 

/*Teachers-Details*/
import { TeachersDetailsComponent } from './views/teachers-details/teachers-details.component';   
import { CreateTeachersDetailsComponent } from './views/teachers-details/create-teachers-details/create-teachers-details.component';  
import { EditTeachersDetailsComponent } from './views/teachers-details/edit-teachers-details/edit-teachers-details.component';  

/*Laboratories*/
import { LaboratoriesComponent } from './views/laboratories/laboratories.component'; 
import { CreateLaboratoriesComponent } from './views/laboratories/create-laboratories/create-laboratories.component';  
import { EditLaboratoriesComponent } from './views/laboratories/edit-laboratories/edit-laboratories.component';   

/*Laboratory-Status*/
import { LaboratoriesStatusComponent } from './views/laboratories-status/laboratories-status.component'; 
import { CreateLaboratoriesStatusComponent } from './views/laboratories-status/create-laboratories-status/create-laboratories-status.component'; 
import { EditLaboratoriesStatusComponent } from './views/laboratories-status/edit-laboratories-status/edit-laboratories-status.component';  

/*Laboratory-Assign*/
import { LaboratoriesAssignComponent } from './views/laboratories-assign/laboratories-assign.component';
import { CreateLaboratoriesAssignComponent } from './views/laboratories-assign/create-laboratories-assign/create-laboratories-assign.component'; 
import { EditLaboratoriesAssignComponent } from './views/laboratories-assign/edit-laboratories-assign/edit-laboratories-assign.component'; 

/*Users*/
import { UsersComponent } from './views/users/users.component'; 

/*Calendar Laboratories*/
import { CalendarLaboratoriesComponent } from './views/calendar-laboratories/calendar-laboratories.component';  

/*Calendar Teachers*/
import { CalendarTeachersComponent } from './views/calendar-teachers/calendar-teachers.component';


const routes: Routes = [
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{path: 'home', component: HomeComponent, canActivate:[ExpenseGuard]},
{path: 'login', component: LoginComponent},
{path: 'logout', component: LogoutComponent},
{path: 'forgot-password', component: ForgotPasswordComponent},
{path: 'reset-password', component: ResetPasswordComponent, canActivate: [ResetPasswordGuard]},
{path: 'register', component: RegisterComponent},

/*Users*/
{path: 'users', component: UsersComponent, canActivate:[ExpenseGuard]},

/*Calendar Laboratories*/
{path: 'calendar-laboratories', component: CalendarLaboratoriesComponent, canActivate:[ExpenseGuard]},

/*Calendar Teachers*/
{path: 'calendar-teachers', component: CalendarTeachersComponent, canActivate:[ExpenseGuard]},

/*Subjects*/
{path: 'subjects', component: SubjectsComponent, canActivate:[ExpenseGuard]},
{path: 'subjects/create-subject', component: CreateSubjectsComponent, canActivate:[ExpenseGuard]},
{path: 'subjects/edit-subject/:id', component: EditSubjectsComponent, canActivate:[ExpenseGuard]},

/*Careers*/
{path: 'careers', component: CareersComponent, canActivate:[ExpenseGuard]},
{path: 'careers/create-career', component: CreateCareersComponent, canActivate:[ExpenseGuard]},
{path: 'careers/edit-career/:id', component: EditCareersComponent, canActivate:[ExpenseGuard]},

/*Courses*/
{path: 'courses', component: CoursesComponent, canActivate:[ExpenseGuard]},
{path: 'courses/create-course', component: CreateCoursesComponent, canActivate:[ExpenseGuard]},
{path: 'courses/edit-course/:id', component: EditCoursesComponent, canActivate:[ExpenseGuard]},

/*Teachers*/
{path: 'teachers', component: TeachersComponent, canActivate:[ExpenseGuard]},
{path: 'teachers/create-teacher', component: CreateTeachersComponent, canActivate:[ExpenseGuard]},
{path: 'teachers/edit-teacher/:id', component: EditTeachersComponent, canActivate:[ExpenseGuard]},

/*Teachers-Details*/
{path: 'teachers-details', component: TeachersDetailsComponent, canActivate:[ExpenseGuard]},
{path: 'teachers-details/create-teacher-detail', component: CreateTeachersDetailsComponent, canActivate:[ExpenseGuard]},
{path: 'teachers-details/edit-teacher-detail/:id', component: EditTeachersDetailsComponent, canActivate:[ExpenseGuard]},

/*Laboratories*/
{path: 'laboratories', component: LaboratoriesComponent, canActivate:[ExpenseGuard]},
{path: 'laboratories/create-laboratory', component: CreateLaboratoriesComponent, canActivate:[ExpenseGuard]},
{path: 'laboratories/edit-laboratory/:id', component: EditLaboratoriesComponent, canActivate:[ExpenseGuard]},

/*Laboratory-Status*/
{path: 'laboratories-status', component: LaboratoriesStatusComponent, canActivate:[ExpenseGuard]},
{path: 'laboratories-status/create-laboratory-status', component: CreateLaboratoriesStatusComponent, canActivate:[ExpenseGuard]},
{path: 'laboratories-status/edit-laboratory-status/:id', component: EditLaboratoriesStatusComponent, canActivate:[ExpenseGuard]},

/*Laboratory-Assign*/
{path: 'laboratories-assign', component: LaboratoriesAssignComponent, canActivate:[ExpenseGuard]},
{path: 'laboratories-assign/create-laboratory-assign', component: CreateLaboratoriesAssignComponent, canActivate:[ExpenseGuard]},
{path: 'laboratories-assign/edit-laboratory-assign/:id', component: EditLaboratoriesAssignComponent, canActivate:[ExpenseGuard]},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
