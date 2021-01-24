import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import {Attendance} from 'src/app/Models/attendance';
import {Status} from 'src/app/Models/status';
import {AttendanceServiceService} from 'src/app/services/attendance-service.service';


@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})
export class AddAttendanceComponent implements OnInit {

  
  attendance : Attendance ;
  message : string ;
 

  constructor(private y : AttendanceServiceService , @Inject(LOCALE_ID) private locale: string) { 
    this.attendance = new Attendance();
  }

  ngOnInit(): void {
  }

  //add attendance 
  addAttendance(){
    
    this.y.addAttendanceService(this.attendance).subscribe(
      (op : Status)=>{
        this.message = op.msg;
        this.attendance.id=0;
        this.attendance.date="";
        this.attendance.course.id=0;
        this.attendance.department.id=0;
        this.attendance.remark="";
      },
      (err)=>{
        this.message= JSON.stringify(err);
      }
    );
  }

}
