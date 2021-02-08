import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import {AuthenticationServiceService} from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isInvalid: boolean;
  isLogout: boolean;
  submitted = false;
  message : string;
  invalidLogin = false;
  loginSuccess = false;

  user: User;
  constructor(private router: Router,
    private routeArgs: ActivatedRoute,
    private y: AuthenticationServiceService
  ) {
    this.user = new User();

  }
  userType: string = this.routeArgs.snapshot.params.role;
  role: string = this.userType.toLowerCase();


  ngOnInit(): void {

  }

  login() {
    //alert("login button clicked ");
    this.y.loginService(this.user).subscribe(
      (op : User)=>{
       // alert(JSON.stringify(op));
        if(op.id == null){
          this.message = "Invalid Details ..Please Try again ... ";
         // alert(this.message);
        }
        else{
          this.y.registerSuccessfulLogin(op.email,op.password);
         // alert(op.roles.roleId);
          if(op.roles.roleId == 1 ){
            this.router.navigate(['/admin']);
          }
          else if(op.roles.roleId == 2 ){
            this.router.navigate(['/student',op.email]);
          }
          else{
            this.router.navigate(['/faculty']);
          }
        }
      },
      (err)=>{
        this.message = "Login Failed";
      }
    )

  }



}
