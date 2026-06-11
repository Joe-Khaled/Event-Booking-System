import { Injectable } from "@nestjs/common";
import { IUserRepository } from "src/modules/user/domain/repositories/user.repository";
import { GetAllUsersResponse } from "./get-all-users-response";
import { User } from "src/modules/user/domain/entities/user.entity";

@Injectable()
export class GetAllUsersUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ){}
    async execute():Promise<GetAllUsersResponse[]> {
        const users = await this.userRepository.findAllUsers();
        return users.map((user:User) => {
            return new GetAllUsersResponse({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            })
        })
    }
}