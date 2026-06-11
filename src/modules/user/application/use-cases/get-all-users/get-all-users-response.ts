export class GetAllUsersResponse {
    id:string;
    name:string;
    email:string;
    role:string;
    constructor(data?:GetAllUsersResponse){
        Object.assign(this, data);
    }
}