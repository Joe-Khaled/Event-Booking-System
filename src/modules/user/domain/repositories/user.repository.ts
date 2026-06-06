import { User } from "../entities/user.entity";

export abstract class IUserRepository {
    abstract findByEmail(email: string): Promise<Partial<User> | null>;
    abstract save(user: User): Promise<void>;
}