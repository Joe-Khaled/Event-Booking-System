import { Injectable } from "@nestjs/common";
import { LoginUserRequest } from "./login-user.request";
import { LoginUserResponse } from "./login-user.response";
import { IUserRepository } from "src/modules/user/domain/repositories/user.repository";
import { IPasswordVerifier } from "../../ports/create-password-verification.port";
import { ITokenProvider } from "../../ports/token-provider";

@Injectable()
export class LoginUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordVerifier: IPasswordVerifier,
        private readonly tokenProvider: ITokenProvider  
    ){}
    async execute(loginUserRequest: LoginUserRequest): Promise<LoginUserResponse> {
        const userExist = await this.userRepository.findByEmail(loginUserRequest.email);
        if(!userExist){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await this.passwordVerifier.verify(loginUserRequest.password, userExist.passwordHash);
        if(!isPasswordValid){
            throw new Error("Invalid credentials");
        }

        const payload = {sub: userExist.id, email: userExist.email, role: userExist.role};
        const token = await this.tokenProvider.generateToken(payload);

        return new LoginUserResponse({token});
    }
}