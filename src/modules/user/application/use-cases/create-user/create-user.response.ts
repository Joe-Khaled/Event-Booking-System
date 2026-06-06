export class createUserResponse {
    id!:string;
    name!:string;
    email!:string;
    role!:string;
    constructor(data?:createUserResponse){
        Object.assign(this, data);
    }
}