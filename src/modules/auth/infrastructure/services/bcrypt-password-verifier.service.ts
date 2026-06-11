import { Injectable } from "@nestjs/common";
import { IPasswordVerifier } from "../../application/ports/create-password-verification.port";
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptPasswordVerifierService implements IPasswordVerifier {
    async verify(plainPassword: string, hashedPassword: string): Promise<boolean> { 
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}