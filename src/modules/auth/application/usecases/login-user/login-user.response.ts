export class LoginUserResponse {
    token: string;
    constructor(data?: LoginUserResponse) {
        Object.assign(this, data);
    }
}