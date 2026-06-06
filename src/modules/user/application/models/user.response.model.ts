export class UserResponseModel {
    id: string = "";
    name: string = "";
    email: string = "";
    role: string = "";
    constructor(data?: Partial<UserResponseModel>) {
        Object.assign(this, data);
    }
}