import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Module({
  imports: [],
  providers: [AuthService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
