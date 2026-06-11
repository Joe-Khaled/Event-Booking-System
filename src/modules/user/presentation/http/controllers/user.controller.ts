import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../../../application/use-cases/create-user/create-user.usecase";
import { CreateUserDto } from "../dto/create-user.dto";
import { createUserRequest } from "src/modules/user/application/use-cases/create-user/create-user.request";
import { GetAllUsersUseCase } from "src/modules/user/application/use-cases/get-all-users/get-all-users.usecase";
import { GetSingleUserUseCase } from "src/modules/user/application/use-cases/get-single-user/get-single-user.usecase";


@Controller("user")
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
        private readonly getSingleUserUseCase: GetSingleUserUseCase
    ) {}

    @Post()
    async createUser(
        @Body() dto:CreateUserDto
    ){
        return this.createUserUseCase.execute(new createUserRequest(dto.name,dto.email,dto.password,dto.role ?? "USER"));
    }

    @Get()
    async getAllUsers(){
        return this.getAllUsersUseCase.execute();
    }

    @Get("/single")
    async getUserByEmail(@Body("email") email:string){
        return this.getSingleUserUseCase.execute({email});
    }

}