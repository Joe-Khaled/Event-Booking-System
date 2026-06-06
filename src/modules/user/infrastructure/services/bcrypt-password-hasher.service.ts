import { Injectable } from "@nestjs/common";
import { IPasswordHasher } from "../../application/ports/password-hasher.port";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptPasswordHasherService implements IPasswordHasher {
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}