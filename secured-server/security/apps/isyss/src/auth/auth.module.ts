import { CatchHandlerService, jwtConfig, JwtStrategy } from '@app/common';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig)],
  providers: [
    AuthService,
    TokenService,
    JwtStrategy,
    jwtConfig,
    CatchHandlerService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
