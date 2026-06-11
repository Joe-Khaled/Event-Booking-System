export class User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(data?: Partial<User>) { 
        Object.assign(this, data);
    }

    static create(params:{
        name: string,
        email: string,
        passwordHash: string,
        role: string,
        status: string,
        createdAt: Date,
        updatedAt: Date
    }): User {
        params.email = params.email.toLowerCase();
        params.status = params.status || 'active';
        return new User(params);
    }
}