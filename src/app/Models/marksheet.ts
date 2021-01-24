import {User} from 'src/app/Models/user';
export class Marksheet {
    java : number;
    datastructure : number;
    angular : number;
    springboot : number;
    obtainedMarks : number;
    totalMarks : number;
    percentage : number; 
    user : User;
    department  : string ;

    constructor(){
        this.user = new User();
    }


}
