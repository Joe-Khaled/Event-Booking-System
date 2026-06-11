export class GetSingleUserRequest {
    email: string;
    constructor(data?: Partial<GetSingleUserRequest>) {
        Object.assign(this, data);
    }
}