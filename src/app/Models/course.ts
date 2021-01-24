import { Department } from "./department";

export class Course {
    id : number;
    courseName : string ;
    description : string ;
    department : Department;

    constructor(){
        this.department = new Department();
    }
}
