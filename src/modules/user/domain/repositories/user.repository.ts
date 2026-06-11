import { User } from "../entities/user.entity";

export abstract class IUserRepository {
    abstract findByEmail(email: string): Promise<User>;
    abstract save(user: User): Promise<void>;
    abstract findAllUsers(): Promise<User[]>;
}