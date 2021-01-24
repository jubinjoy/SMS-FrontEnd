import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AddAttendanceComponent } from './Components/attendance/add-attendance/add-attendance.component';
import { ViewAttendanceComponent } from './Components/attendance/view-attendance/view-attendance.component';
import { ModifyAttendanceComponent } from './Components/attendance/modify-attendance/modify-attendance.component';


const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'login/:role', component : LoginComponent},
  {path : 'addAttendance' , component : AddAttendanceComponent},
  {path : 'viewAttendance' , component : ViewAttendanceComponent},
  {path : 'modifyAttendance/:assignID', component : ModifyAttendanceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
