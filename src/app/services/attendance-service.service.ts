import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from 'src/app/Models/attendance';
import { Status } from 'src/app/Models/status';
import {User} from 'src/app/Models/user';

@Injectable({
  providedIn: 'root'
})
export class AttendanceServiceService {

  constructor(private ao: HttpClient) { }

  addAttendanceService(attendance: Attendance): Observable<Status> {
    let url: string = "http://localhost:8080/attendance";
    return this.ao.post<Status>(url, attendance);
  }

  viewAttendanceListService(): Observable<Attendance[]> {
    let url: string = "http://localhost:8080/attendance";
    return this.ao.get<Attendance[]>(url);
  }

  deleteAttendanceService(attendanceId: number): Observable<Status> {
    let url: string = "http://localhost:8080/attendance/" + attendanceId;
    return this.ao.delete<Status>(url);
  }

  editService(attendanceId: number): Observable<Attendance> {
    let url: string = "http://localhost:8080/attendanceByAttId/" + attendanceId;
    return this.ao.get<Attendance>(url);

  }

  searchAttendanceService(userId: number): Observable<Attendance[]> {
    let url: string = "http://localhost:8080/attendance/" + userId;
    return this.ao.get<Attendance[]>(url);
  }


  updateAttendanceService(attendance: Attendance): Observable<Status> {
    let url: string = "http://localhost:8080/attendance";
    return this.ao.put<Status>(url, attendance);
  }
  
  searchByDeptAndRoleService(user : User): Observable<User[]>{
    let url: string = "http://localhost:8080/userList";
    return this.ao.post<User[]>(url, user);

  }

}
