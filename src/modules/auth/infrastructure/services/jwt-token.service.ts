import { Injectable } from "@nestjs/common";
import { ITokenProvider } from "../../application/ports/token-provider";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtTokenService implements ITokenProvider{
    constructor(
        private readonly jwtService: JwtService
    ){}
    generateToken(payload: object, expiresIn?: string | number): Promise<string> {
        return this.jwtService.signAsync(payload);
    }
    verifyToken(token: string): Promise<object | string> {
        return  this.jwtService.verifyAsync(token);
    }
}