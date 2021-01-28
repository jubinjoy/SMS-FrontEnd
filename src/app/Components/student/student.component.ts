import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import {Observable} from 'rxjs';
import {StudentServiceService} from 'src/app/services/student-service.service';
import {Attendance} from 'src/app/Models/attendance';
import {AttendanceServiceService} from 'src/app/services/attendance-service.service';
import { formatDate } from '@angular/common';
import {AuthenticationServiceService} from 'src/app/services/authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  message : string = "";
  fileInfos : Observable<any>;
  viewNotificationSts : boolean = false;
  viewAssignmentSts : boolean = false;
  viewAttendanceSts : boolean ;
  alldata : Attendance[];
  isLoggedIn :boolean = false;

  constructor(private y : StudentServiceService, private authenticationService :AuthenticationServiceService,
    private attendanceService : AttendanceServiceService , @Inject(LOCALE_ID) private locale: string,
    private router : Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    console.log('menu ->' + this.isLoggedIn);
  }

   //view Notification
   viewNotification(){
    this.viewAttendanceSts=false;
    this.viewAssignmentSts = false;
    this.fileInfos = this.y.viewNotificationService();
    this.viewNotificationSts = true;
  }

  //view assignments
  viewAssignment(){
    this.viewAttendanceSts=false;
      this.viewNotificationSts = false;
      this.fileInfos = this.y.viewAssignmentService();
      this.viewAssignmentSts = true ;
  }

  viewAttendance(){
    this.viewAssignmentSts = false;
    this.viewNotificationSts = false;
   this.attendanceService.viewAttendanceListService().subscribe(
     (data : Attendance[])=>{
      for (var i = 0; i < data.length; i++) {
        data[i].date = formatDate(data[i].date, 'dd-MM-yyyy', this.locale);
      }
       this.alldata=data;
       this.viewAttendanceSts=true;
     },
     (err)=>{
      this.message=JSON.stringify(err);
     }
   )

  }


  logout(){
    this.authenticationService.logout();
    this.router.navigate(["/"]);
  }
}
