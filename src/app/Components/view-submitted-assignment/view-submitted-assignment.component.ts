import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FacultyServicesService} from 'src/app/services/faculty-services.service';
import {Responsemessage} from 'src/app/Models/responsemessage'

@Component({
  selector: 'app-view-submitted-assignment',
  templateUrl: './view-submitted-assignment.component.html',
  styleUrls: ['./view-submitted-assignment.component.css']
})
export class ViewSubmittedAssignmentComponent implements OnInit {

  message : string ;
  fileInfos : Observable<any>;

  constructor(private y : FacultyServicesService) { }

  ngOnInit(): void {
    this.submittedAssignment();
  }

  delete(id : number){
    this.y.deleteSubmittedAssignmentService(id).subscribe(
      (op : Responsemessage)=>{
        this.message = op.message;
        this.submittedAssignment();
      } ,
      (err)=> {
        this.message = JSON.stringify(err);
      }
    );
  }

  submittedAssignment(){
    this.fileInfos = this.y.submitAssignmentService();
  }


}
