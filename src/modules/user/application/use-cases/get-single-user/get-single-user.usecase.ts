import { Injectable } from "@nestjs/common";
import { IUserRepository } from "src/modules/user/domain/repositories/user.repository";
import { GetSingleUserRequest } from "./get-single-user.request";
import { GetSingleUserResponse } from "./get-single-user.response";

@Injectable()
export class GetSingleUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ){}
    async execute(request: GetSingleUserRequest) {
        const user = await this.userRepository.findByEmail(request.email);
        if(!user){
            throw new Error("User not found");
        }
        return new GetSingleUserResponse({ 
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    }
}