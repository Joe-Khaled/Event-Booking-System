export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly passwordHash: string,
        public readonly role: string,
        public readonly status: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date 
    ) {}

    static create(params:{
    id: string,
    name: string,
    email: string,
    passwordHash: string,
    role: string,
    status: string,
    createdAt: Date,
    updatedAt: Date 
}): User {
        return new User(
            params.id,
            params.name,
            params.email,
            params.passwordHash,
            params.role,
            params.status,
            params.createdAt,
            params.updatedAt
        );
    }
}