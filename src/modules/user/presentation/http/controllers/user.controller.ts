import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../../../application/use-cases/create-user/create-user.usecase";
import { CreateUserDto } from "../dto/create-user.dto";
import { createUserRequest } from "src/modules/user/application/use-cases/create-user/create-user.request";


@Controller("user")
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase
    ) {}
    @Post()
    async createUser(
        @Body() dto:CreateUserDto
    ){
        return this.createUserUseCase.execute(new createUserRequest(dto.name,dto.email,dto.password));
    }
}