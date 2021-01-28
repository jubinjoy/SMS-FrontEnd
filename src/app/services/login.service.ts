import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from 'src/app/Models/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private ao  :HttpClient) { }


  loginService(user  : User):Observable<User>{
    let url:string ="http://localhost:8080/login";
      return this.ao.post<User>(url,user);
  }
}
