import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthController } from "./presentation/controllers/auth.controller";
import { RegisterUserUseCase } from "./application/usecases/registerUserUsecase/register-user.usecase";
import { JwtModule } from "@nestjs/jwt";
import { JwtTokenService } from "./infrastructure/services/jwt-token.service";
import { BcryptPasswordVerifierService } from "./infrastructure/services/bcrypt-password-verifier.service";
import { LoginUserUseCase } from "./application/usecases/login-user/login-user.usercase";
import { IPasswordVerifier } from "./application/ports/create-password-verification.port";
import { ITokenProvider } from "./application/ports/token-provider";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        UserModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const secret = configService.get<string>("JWT_SECRET_KEY");
                if (!secret) {
                    throw new Error("JWT_SECRET_KEY must be defined");
                }
                return {
                    global: true,
                    secret,
                    signOptions: { expiresIn: '60s' },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [
        RegisterUserUseCase,
        LoginUserUseCase,
        {
            provide: ITokenProvider,
            useClass: JwtTokenService
        },
        {
            provide: IPasswordVerifier,
            useClass: BcryptPasswordVerifierService
        }
    ]

})
export class AuthModule { }