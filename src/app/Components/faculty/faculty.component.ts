import { Component, OnInit } from '@angular/core';
import {Assignment} from 'src/app/Models/assignment';
import {Responsefile} from 'src/app/Models/responsefile';
import {Responsemessage} from 'src/app/Models/responsemessage';
import {FacultyServicesService} from 'src/app/services/faculty-services.service';
import {Observable} from 'rxjs';
import {Attendance} from 'src/app/Models/attendance';
import {Marksheet} from 'src/app/Models/marksheet';
import { Router } from '@angular/router';
//import * as fileSaver from 'file-saver';
import {AuthenticationServiceService} from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  assignment : Assignment ;
  selectedFiles: FileList;
  currentFile: File;
  addAssign : boolean = false;
  viewAssignmentSts : boolean = false;
  message : string = "";
  viewNotificationSts : boolean = false;
  fileInfos : Observable<any>;
  isLoggedIn : boolean = false;

  constructor(private y : FacultyServicesService, private router : Router
    ,private authenticationService : AuthenticationServiceService) { 
    this.assignment = new Assignment();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    console.log('menu ->' + this.isLoggedIn);
  }

  selectFile(event) {
    this.currentFile = event.target.files[0];
  }

  addAssignment(){
    this.viewAssignmentSts = false ;
    this.viewNotificationSts = false;
    this.addAssign = true;
  }

  viewAssignment(){
    this.addAssign = false;
    this.viewAssignmentSts = false;
    this.viewNotificationSts = false;
    this.viewAssignmentSts = true ;
    this.fileInfos = this.y.viewAssignmentService();
  }


  upload(){
    const formData = new FormData();
    formData.append('asgJson', JSON.stringify(this.assignment));
    formData.append('File',this.currentFile);
    this.y.uploadService(formData).subscribe(
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


  searchByDept(dept : string){
    this.fileInfos = this.y.viewAssignmentByDept(dept);
    this.assignment.department = "";
  }

  delete(id : string){
    this.y.deleteAssignmentService(id).subscribe(
      (op : Responsemessage)=>{
        this.message = op.message;
        this.viewAssignment();
      } ,
      (err)=> {
        this.message = JSON.stringify(err);
      }
    );
  }

  //view Notification
  viewNotification(){
    this.addAssign= false;
    this.viewAssignmentSts = false;
    this.fileInfos = this.y.viewNotificationService();
    this.viewNotificationSts = true;
  }

  //to route to add-attendance page
  activateAddAttendance(){
    this.router.navigate(['/addAttendance']);
  }

  //to route to view-attendance page
  activateViewAttendance(){
    this.router.navigate(['/viewAttendance']);
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(["/"]);
  }

}
