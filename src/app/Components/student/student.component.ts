import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import {Observable} from 'rxjs';
import {StudentServiceService} from 'src/app/services/student-service.service';
import {Attendance} from 'src/app/Models/attendance';
import {AttendanceServiceService} from 'src/app/services/attendance-service.service';
import { formatDate } from '@angular/common';
import {AuthenticationServiceService} from 'src/app/services/authentication-service.service';
import { Router } from '@angular/router';
import {StudentAssignment} from 'src/app/Models/student-assignment';
import {Responsemessage} from 'src/app/Models/responsemessage';

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
  submitAssignSts : boolean = false;
  alldata : Attendance[];
  isLoggedIn :boolean = false;
  assignment : StudentAssignment;
  currentFile: File;

  constructor(private y : StudentServiceService, private authenticationService :AuthenticationServiceService,
    private attendanceService : AttendanceServiceService , @Inject(LOCALE_ID) private locale: string,
    private router : Router) { 
      this.assignment = new StudentAssignment();
    }

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    console.log('menu ->' + this.isLoggedIn);
  }

   //view Notification
   viewNotification(){
    this.submitAssignSts = false;
    this.viewAttendanceSts=false;
    this.viewAssignmentSts = false;
    this.fileInfos = this.y.viewNotificationService();
    this.viewNotificationSts = true;
  }

  //view assignments
  viewAssignment(){
    this.submitAssignSts = false;
    this.viewAttendanceSts=false;
      this.viewNotificationSts = false;
      this.fileInfos = this.y.viewAssignmentService();
      this.viewAssignmentSts = true ;
  }

  viewAttendance(){
    this.submitAssignSts = false;
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

  //activate submit assignment
  activateSubmitAssignment(){
    this.viewAssignmentSts= false;
    this.viewAttendanceSts = false ;
    this.viewNotificationSts = false;
    this.submitAssignSts = true;
  }

  //select file 
  selectFile(event) {
    this.currentFile = event.target.files[0];
  }

  //submit assignment
  submitAssignment(){
    const formData = new FormData();
    formData.append('asgJson', JSON.stringify(this.assignment));
    formData.append('File',this.currentFile);
    this.y.submitAssignmentService(formData).subscribe(
      (op : Responsemessage)=>{
        this.message = op.message;
      },
      (err)=>{
        this.message= JSON.stringify(err);
      }
    );
    this.assignment.department = "";
    this.message = "";

  }


  logout(){
    this.authenticationService.logout();
    this.router.navigate(["/"]);
  }
}
