import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserOrmEntity } from "../entities/user.orm-entity";
import { IUserRepository } from "src/modules/user/domain/repositories/user.repository";
import { Repository } from "typeorm";
import { User } from "src/modules/user/domain/entities/user.entity";
import { UserResponseModel } from "../../../../application/models/user.response.model";

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly repository: Repository<UserOrmEntity>
    ){}

    async findByEmail(email: string): Promise<Partial<User> | null> {
        const userOrmEntity = await this.repository.findOne({ where: { email } });
        if (!userOrmEntity) {
            return null;
        }
        return new UserResponseModel({
            id: userOrmEntity.id,
            name: userOrmEntity.name,
            email: userOrmEntity.email,
            role: userOrmEntity.role,
        })
    }

    async save(user: User): Promise<void> {
        const userOrmEntity = this.repository.create({
            id: user.id,
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
            role: user.role,
            status: user.status,
        });
        await this.repository.save(userOrmEntity);
    }
    
}