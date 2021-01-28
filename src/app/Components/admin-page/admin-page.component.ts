import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { Role } from 'src/app/Models/role';
import { Department } from 'src/app/Models/department';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Status } from 'src/app/Models/status';
import { Notification } from 'src/app/Models/notification';
import { Responsemessage } from 'src/app/Models/responsemessage';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  user: User;
  message: string = "";
  task: string = "";
  addSts: boolean = false;
  modSts: boolean = false;
  alldata: User[] = null;
  sdata: User = null;
  viewSts: boolean = false;
  disableId: boolean = true;
  addNotificationSts: boolean = false;
  viewNotificationSts: boolean = false;
  addBtnSts: boolean = false;
  modBtnSts: boolean = false;
  userRole: Role;
  userDepartment: Department;
  notification: Notification;
  selectedFiles: FileList;
  currentFile: File;
  fileInfos: Observable<any>;

  isLoggedIn: boolean = false;

  constructor(private y: UserServiceService,
    private authenticationService: AuthenticationServiceService
    , private router: Router) {
    this.user = new User();
    this.notification = new Notification();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    console.log('menu ->' + this.isLoggedIn);
  }


  activateAddUser() {
    this.message = "";
    this.addNotificationSts = false;
    this.viewNotificationSts = false;
    this.modBtnSts = false;
    this.viewSts = false;
    this.addBtnSts = true;
    this.addSts = true;
    this.task = "Add";

  }
  addUser() {
    this.modSts = false;
    this.viewNotificationSts = false;
    //alert("add butotn clicked ");
    //alert(this.user.email+" "+this.user.department.id+" "+this.user.roles.roleId);
    this.y.addUser(this.user).subscribe(
      (op: Status) => {
        this.message = "User Registered Successfully .." + op.msg;
      },
      (err) => {
        this.message = JSON.stringify(err);
      }
    );
    this.user.id = 0;
    this.user.firstName = "";
    this.user.lastName = "";
    this.user.password = "";
    this.user.phone = "";
    this.user.email = "";
    this.user.roles.roleId = 0;
    this.user.department.id = 0;
  }
  activateRemoveUser(id: number) {

    this.y.deleteService(id).subscribe(
      (op: Status) => {
        // alert(op.msg);
        this.message = "User " + id + " Deleted Successfully ..";
        this.activateViewUser();
      },
      (err) => {
        alert("somethin is wrong ");
        this.message = JSON.stringify(err);
      }
    )

  }
  activateViewUser() {
    this.addSts = false;
    this.viewNotificationSts = false;
    this.addNotificationSts = false;
    this.y.viewUserService().subscribe(
      (data: User[]) => {
        this.alldata = data;
        this.viewSts = true;
        this.message = "Users Viewed Successfully ..";
      },
      (err) => {
        this.message = "There is some error ..";
      }
    );
  }


  edit(email: string) {
    this.addBtnSts = false;
    this.viewNotificationSts = false;
    this.task = "Update";
    this.viewSts = false;
    this.addSts = true;
    this.modSts = true;
    this.modBtnSts = true;
    //searching to find the user with the given email id 
    this.y.searchService(email).subscribe(
      (data: User) => {
        this.message = "Search Successful ";
        this.user = data;
      },
      (err) => {
        this.message = "Search Failed ";
      }
    );

  }

  //to update the user data
  modUser() {
    //alert("mod button pressed");
    this.task = "Modify ";
    this.y.modService(this.user).subscribe(
      (op: User) => {
        this.user = op;
        this.message = " Modified Successfully ";
        // alert(this.user.email+this.user.department);
      },
      (err) => {
        this.message = "Error";
      }
    );
    this.user.id = 0;
    this.user.firstName = "";
    this.user.lastName = "";
    this.user.password = "";
    this.user.phone = "";
    this.user.email = "";
    this.user.roles.roleId = 0;
    this.user.department.id = 0;
  }

  activateSearch(email: string) {
    this.message = "";
    this.addBtnSts = false;
    this.modBtnSts = false;
    this.viewNotificationSts = false;
    //alert("Search button clicked ");
    //alert(this.user.email);
    this.y.searchService(email).subscribe(
      (data: User) => {
        this.message = "Search Successful ";
        // this.sdata = data;
        this.alldata = [];
        this.alldata.push(data);
      },
      (err) => {
        this.message = "Search Failed ";
      }
    );
  }

  activateUploadNotification() {
    this.message = "";
    this.addSts = false;
    this.viewSts = false;
    this.viewNotificationSts = false;
    this.addNotificationSts = true;
  }

  selectFile(event) {
    this.currentFile = event.target.files[0];
  }

  uploadNotification() {
    this.message = "";
    const formData = new FormData();
    formData.append('asgJson', JSON.stringify(this.notification));
    formData.append('File', this.currentFile);
    this.y.uploadNotificationService(formData).subscribe(
      (op: Responsemessage) => {
        this.message = op.message;
      },
      (err) => {
        this.message = JSON.stringify(err);
      }
    );
    this.notification.department = "";
  }

  //View Notifications
  viewNotification() {
    this.message = "";
    this.addSts = false;
    this.viewSts = false;
    this.addNotificationSts = false;
    this.viewNotificationSts = true;
    this.fileInfos = this.y.viewNotificationService();
  }


  //deleteAssignmets
  delete(id: string) {
    this.message = "";
    this.y.deleteNotificationService(id).subscribe(
      (op: Responsemessage) => {
        this.message = op.message;
        this.viewNotification();
      },
      (err) => {
        this.message = JSON.stringify(err);
      }
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/"]);

  }



}
