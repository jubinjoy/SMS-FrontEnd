import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Models/student';
import { Admin } from 'src/app/Models/admin';
import { Faculty } from 'src/app/Models/faculty';
 @Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private ao  :HttpClient) { }

  studentLoginService(stud  : Student):Observable<Student>{
    let url:string ="http://localhost:7071/studentlogin";
      return this.ao.post<Student>(url,stud);
  }
  
  facultyLoginService(fac  : Faculty): Observable<Faculty>{
    let url:string ="http://localhost:7071/facultylogin";
    return this.ao.post<Faculty>(url,fac);
  }
  adminLoginService(adm  : Admin) : Observable<Admin>{
    let url:string ="http://localhost:7071/adminlogin";
      return this.ao.post<Admin>(url,adm);
  }
  

}
