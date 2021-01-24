import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router : Router) { }
  userType(type : number){
    if(type == 1 ){
      this.router.navigate(['/login','Student']);    
     
    }
    else if(type == 2){
      this.router.navigate(['/login','Faculty']);
      }
    else{
      this.router.navigate(['/login','Admin']);
      }
  }

  ngOnInit(): void {
  }

}
