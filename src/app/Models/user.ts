import { Role } from 'src/app/Models/role';
import {Department} from 'src/app/Models/department';
export class User {
    id : number;
    password : string;
    email  : string ;
    firstName : string;
    lastName : string ;
    phone : string ;
    roles  : Role;
    department : Department;

    constructor(){
        this.roles = new Role();        
        this.department = new Department();
    }

}
