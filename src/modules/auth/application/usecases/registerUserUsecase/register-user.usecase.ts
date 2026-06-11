import { Injectable } from "@nestjs/common";
import { IPasswordHasher } from "../../../../user/application/ports/password-hasher.port";
import { IUserRepository } from "../../../../user/domain/repositories/user.repository";
import { RegisterUserResponse } from "./register-user.response";
import { RegisterUserRequest } from "./register-user.request";
import { User } from "src/modules/user/domain/entities/user.entity";
import { UserRole } from "../../../../user/application/enums/userRole.enum";
import { UserStatus } from "src/modules/user/application/enums/userStatus.enum";

@Injectable()
export class RegisterUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
    ) {}
    async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
        const existingUser = await this.userRepository.findByEmail(request.email);
        if (existingUser) {
            throw new Error("Email already in use");
        }
        const passwordHash = await this.passwordHasher.hash(request.password);
        const user = User.create({
                    name: request.name,
                    email: request.email,
                    passwordHash: passwordHash,
                    role: UserRole.CUSTOMER,
                    status: UserStatus.Active,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                await this.userRepository.save(user);
                return new RegisterUserResponse({
                    name: user.name,
                    email: user.email,
                });
    }
}