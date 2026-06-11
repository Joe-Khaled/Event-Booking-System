import { Get, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserOrmEntity } from "./infrastructure/persistence/typeorm/entities/user.orm-entity";
import { UserController } from "./presentation/http/controllers/user.controller";
import { CreateUserUseCase } from "./application/use-cases/create-user/create-user.usecase";
import { IUserRepository } from "./domain/repositories/user.repository";
import { TypeOrmUserRepository } from "./infrastructure/persistence/typeorm/repositories/typeorm-user.repository";
import { IPasswordHasher } from "./application/ports/password-hasher.port";
import { BcryptPasswordHasherService } from "./infrastructure/services/bcrypt-password-hasher.service";
import { GetAllUsersUseCase } from "./application/use-cases/get-all-users/get-all-users.usecase";
import { GetSingleUserUseCase } from "./application/use-cases/get-single-user/get-single-user.usecase";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity])
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetSingleUserUseCase,
    {
      provide: IUserRepository,
      useClass: TypeOrmUserRepository
    },
    {
      provide: IPasswordHasher,
      useClass: BcryptPasswordHasherService
    }
  ],
  exports:[IUserRepository, IPasswordHasher]
})
export class UserModule {}