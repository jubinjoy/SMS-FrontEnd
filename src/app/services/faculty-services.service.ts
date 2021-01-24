import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Responsemessage} from 'src/app/Models/responsemessage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FacultyServicesService {

  constructor(private ao : HttpClient) { }

  uploadService(formData : FormData): Observable<any>{
    let url:string ="http://localhost:8080/upload";
      return this.ao.post(url,formData);

  }

  viewAssignmentService() : Observable<any>{
    let url:string ="http://localhost:8080/files";
    return this.ao.get(url);
  }

  viewAssignmentByDept(dept : string) : Observable<any>{
    let url:string ="http://localhost:8080/filess/"+dept;
    return this.ao.get(url);

  }

  downloadService(id : string) : Observable<any>{
    let url:string ="http://localhost:8080/downloadFile/"+id;
    return this.ao.get(url);
  }

  deleteAssignmentService(id : string ): Observable<any>{
    let url:string ="http://localhost:8080/files/"+id;
    return this.ao.delete<Responsemessage>(url);
  }

  viewNotificationService() : Observable<any>{
    let url:string ="http://localhost:8080/notification";
    return this.ao.get(url);
  }


}
