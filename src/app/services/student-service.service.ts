import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Responsemessage} from 'src/app/Models/responsemessage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(private ao : HttpClient) { }

  viewNotificationService() : Observable<any>{
    let url:string ="http://localhost:8080/notification";
    return this.ao.get(url);
  }

  viewAssignmentService() : Observable<any>{
    let url:string ="http://localhost:8080/files";
    return this.ao.get(url);
  }

  submitAssignmentService(formData : FormData): Observable<any>{
      let url:string ="http://localhost:8080/submit";
        return this.ao.post(url,formData);
    }

}
