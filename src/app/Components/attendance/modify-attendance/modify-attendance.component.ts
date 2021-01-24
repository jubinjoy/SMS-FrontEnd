import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import {Attendance} from 'src/app/Models/attendance';
import {Status} from 'src/app/Models/status';
import {AttendanceServiceService} from 'src/app/services/attendance-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-modify-attendance',
  templateUrl: './modify-attendance.component.html',
  styleUrls: ['./modify-attendance.component.css']
})
export class ModifyAttendanceComponent implements OnInit {

  attendance : Attendance ;
  message : string ;
  assignmentId : number ;
  userType  : string =this.routeArgs.snapshot.params.assignID;
 

  constructor(private y : AttendanceServiceService , @Inject(LOCALE_ID) private locale: string,private routeArgs : ActivatedRoute ) { 
    this.attendance = new Attendance();
  }

  ngOnInit(): void {
    this.assignmentId  = this.routeArgs.snapshot.params.assignID;
    alert(this.assignmentId);
    this.edit(this.assignmentId);
    
  }
  edit(attendanceId : number){
    this.y.editService(attendanceId).subscribe(
      (op : Attendance)=>{
        this.attendance= op;
      },
      (err)=>{
        this.message = JSON.stringify(err);
      }
    );
  }


  updateAttendance(){
    this.y.updateAttendanceService(this.attendance).subscribe(
      (op : Status)=>{
        this.message=op.msg;
        this.attendance.id=0;
        this.attendance.date="";
        this.attendance.course.id=0;
        this.attendance.department.id=0;
        this.attendance.remark="";
      },
      (err)=>{
        this.message = JSON.stringify(err);
      }
    );

  }

}
