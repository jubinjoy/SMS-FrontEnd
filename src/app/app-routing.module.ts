import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AddAttendanceComponent } from './Components/attendance/add-attendance/add-attendance.component';
import { ViewAttendanceComponent } from './Components/attendance/view-attendance/view-attendance.component';
import { ModifyAttendanceComponent } from './Components/attendance/modify-attendance/modify-attendance.component';
import {AdminPageComponent} from './Components/admin-page/admin-page.component';
import {FacultyComponent} from './Components/faculty/faculty.component';
import {StudentComponent} from './Components/student/student.component';
import {AuthguardService} from './services/authguard.service';

const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'login/:role', component : LoginComponent},
  {path : 'addAttendance' , component : AddAttendanceComponent,canActivate:[AuthguardService]},
  {path : 'viewAttendance' , component : ViewAttendanceComponent,canActivate:[AuthguardService]},
  {path : 'modifyAttendance/:assignID', component : ModifyAttendanceComponent ,canActivate:[AuthguardService]},
  {path : 'student' , component : StudentComponent,canActivate:[AuthguardService] },
  {path : 'admin' , component : AdminPageComponent ,canActivate:[AuthguardService]},
  {path : 'faculty' , component : FacultyComponent ,canActivate:[AuthguardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
