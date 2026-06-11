export class GetSingleUserResponse {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(data?: Partial<GetSingleUserResponse>) {
        Object.assign(this, data);
    }
}