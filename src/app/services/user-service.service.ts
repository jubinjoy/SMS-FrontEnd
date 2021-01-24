import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from 'src/app/Models/user';
import {Status} from 'src/app/Models/status';
import {Responsemessage} from 'src/app/Models/responsemessage';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private ao : HttpClient) { 
  }

  addUser(user : User): Observable<Status>{
    alert(user.roles.roleId);
    let url:string ="http://localhost:8080/users";
      return this.ao.post<Status>(url,user);
  }

  viewUserService() : Observable<User[]>
  {
    let url:string ="http://localhost:8080/users";
      return this.ao.get<User[]>(url);
  }

  searchService(email : string ) : Observable<User>{
    let url:string ="http://localhost:8080/users/"+email;
    return this.ao.get<User>(url);
  }

  modService(user : User) : Observable<User>{
    let url:string ="http://localhost:8080/users";
      return this.ao.put<User>(url,user);
  }

  deleteService(id :number) : Observable<Status>{
    let url:string ="http://localhost:8080/users/"+id;
    return this.ao.delete<Status>(url);
  }

  uploadNotificationService(formData : FormData): Observable<any>{
    let url:string ="http://localhost:8080/uploadNotification";
      return this.ao.post(url,formData);

  }

  viewNotificationService() : Observable<any>{
    let url:string ="http://localhost:8080/notification";
    return this.ao.get(url);
  }

  //deleteNotificationService
  deleteNotificationService(id : string){
    let url:string ="http://localhost:8080/notification/"+id;
    return this.ao.delete<Responsemessage>(url);

  }



}
