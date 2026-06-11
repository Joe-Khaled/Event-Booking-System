import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { IPasswordHasher } from "../../ports/password-hasher.port";
import { createUserRequest } from "./create-user.request";
import { User } from "../../../domain/entities/user.entity";
import { createUserResponse } from "./create-user.response";
import { UserResponseModel } from "../../models/user.response.model";
@Injectable()
export class CreateUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher
    ){}
    async execute(request: createUserRequest):Promise<UserResponseModel> {
        const existingUser = await this.userRepository.findByEmail(request.email);
        if(existingUser){
            throw new Error("Email already in use");
        }
        const passwordHash = await this.passwordHasher.hash(request.password);

        const user = User.create({
            name: request.name,
            email: request.email,
            passwordHash: passwordHash,
            role: request.role,
            status: "active",
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await this.userRepository.save(user);
        const newUser = new UserResponseModel({
            name: user.name,
            email: user.email,
            role: user.role,
        })
        return new createUserResponse(newUser);
    }
}
