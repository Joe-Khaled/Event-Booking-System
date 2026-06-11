export class RegisterUserResponse {
    name:string;
    email:string;
    constructor(data?:RegisterUserResponse){
        Object.assign(this, data);
    }
}