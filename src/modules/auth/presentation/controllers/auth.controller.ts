import { Controller, Post, Body } from "@nestjs/common";
import { RegisterUserUseCase } from "../../application/usecases/registerUserUsecase/register-user.usecase";
import { RegisterUserDto } from "../dto/create-user.dto";
import { RegisterUserRequest } from "../../application/usecases/registerUserUsecase/register-user.request";
import { LoginUserDto } from "../dto/login-user.dto";
import { LoginUserUseCase } from "../../application/usecases/login-user/login-user.usercase";
import { LoginUserRequest } from "../../application/usecases/login-user/login-user.request";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly loginUserUseCase: LoginUserUseCase 
    ){}
    @Post("/register")
    async register(@Body() userData: RegisterUserDto){
        return await this.registerUserUseCase.execute(new RegisterUserRequest(userData.name, userData.email, userData.password));
    }

    @Post("/login")
    async login(@Body() loginData: LoginUserDto){
        return await this.loginUserUseCase.execute(new LoginUserRequest(loginData.email, loginData.password));
    }
}