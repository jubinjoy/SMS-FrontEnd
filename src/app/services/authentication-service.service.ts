import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String;
  public password: String;
  constructor(private ao: HttpClient) { }


  loginService(user: User): Observable<User> {
   // alert("we reached login service");
    let url: string = "http://localhost:8080/login";
    return this.ao.post<User>(url, user);
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) {
      return false;
    }
    else {
      return true;
    }
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) {
      return '';
    }
    else {
      return user;
    }
  }
}
