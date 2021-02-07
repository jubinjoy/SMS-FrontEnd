import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { AdminPageComponent } from './Components/admin-page/admin-page.component';
import { FacultyComponent } from './Components/faculty/faculty.component';
import { StudentComponent } from './Components/student/student.component';
import { AddAttendanceComponent } from './Components/attendance/add-attendance/add-attendance.component';
import { ViewAttendanceComponent } from './Components/attendance/view-attendance/view-attendance.component';
import { ModifyAttendanceComponent } from './Components/attendance/modify-attendance/modify-attendance.component';
import { ViewSubmittedAssignmentComponent } from './Components/view-submitted-assignment/view-submitted-assignment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminPageComponent,
    FacultyComponent,
    StudentComponent,
    AddAttendanceComponent,
    ViewAttendanceComponent,
    ModifyAttendanceComponent,
    ViewSubmittedAssignmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
