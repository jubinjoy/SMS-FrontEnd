import { Course } from "./course";
import { Department } from "./department";
import { User } from "./user";

export class Attendance {
    id : number;
    department : Department;
    course : Course;
    remark : string ;
    date : any;
    user : User;

    constructor(){
        this.department = new Department();
        this.course  = new Course();
        this.user = new User();
    }
}
