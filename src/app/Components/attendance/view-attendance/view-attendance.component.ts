import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import {Attendance} from 'src/app/Models/attendance';
import {Status} from 'src/app/Models/status';
import {AttendanceServiceService} from 'src/app/services/attendance-service.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {
    
  attendance : Attendance ;
  message : string ;
  alldata : Attendance[];

  constructor(private y : AttendanceServiceService , @Inject(LOCALE_ID) private locale: string
  ,private rourte : Router) { 
    this.attendance = new Attendance();
  }

  ngOnInit(): void {
    this.viewAttendanceList();
  }

  viewAttendanceList(){
    this.y.viewAttendanceListService().subscribe(
      (data : Attendance[])=>{
        for (var i = 0; i < data.length; i++) {
          data[i].date = formatDate(data[i].date, 'dd-MM-yyyy', this.locale);
        }
        this.alldata = data;
      },
      (err)=>{
        this.message=JSON.stringify(err);
      }
    )
  }

  searchAttendance(userId : number){
    this.y.searchAttendanceService(userId).subscribe(
      (data : Attendance[])=>{
        for (var i = 0; i < data.length; i++) {
          data[i].date = formatDate(data[i].date, 'dd-MM-yyyy', this.locale);
        }
        this.alldata = data;

      },
      (err)=>{
        this.message=JSON.stringify(err);
      }
    )

  }

  deleteAttendance(attendanceId : number){
    this.y.deleteAttendanceService(attendanceId).subscribe(
      (op : Status)=>{
        this.message=op.msg;
        this.viewAttendanceList();
      },
      (err)=>{
        this.message = JSON.stringify(err);
      }
    );
  }


  edit(assignmentId : number){
    alert("edit button is pressed ");
    this.rourte.navigate(['/modifyAttendance' ,assignmentId]);
  }


}
