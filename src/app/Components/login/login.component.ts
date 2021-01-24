import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isInvalid: boolean;
  isLogout: boolean;
  submitted = false;

  user: User;
  constructor(private router: Router,
    private routeArgs: ActivatedRoute,
    private y: UserServiceService
  ) {
    this.user = new User();

  }
  userType: string = this.routeArgs.snapshot.params.role;
  role: string = this.userType.toLowerCase();


  ngOnInit(): void {

  }
  findUser(){
    
  }


  login() {


  }



}
