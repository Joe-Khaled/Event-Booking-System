import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserOrmEntity } from "../entities/user.orm-entity";
import { IUserRepository } from "src/modules/user/domain/repositories/user.repository";
import { Repository } from "typeorm";
import { User } from "src/modules/user/domain/entities/user.entity";


@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly repository: Repository<UserOrmEntity>
    ){}

    async findByEmail(email: string): Promise<User> {
        const userOrmEntity = await this.repository.findOne({ where: { email } });
        if (!userOrmEntity) {
            return null;
        }
        return userOrmEntity
    }

    async save(user: User): Promise<void> {
        const userOrmEntity = this.repository.create({
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
            role: user.role,
            status: user.status,
        });
        await this.repository.save(userOrmEntity);
    }

    async findAllUsers(): Promise<User[]> {
        const userOrmEntities = await this.repository.find();
        return userOrmEntities;
    }
    
}