import {
  LoginSessionSchema,
  RefreshTokenSchema,
} from '@isyss-cdm/cache-schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginSessionService } from './login-session.service';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RefreshToken', schema: RefreshTokenSchema },
      { name: 'LoginSession', schema: LoginSessionSchema },
    ]),
  ],
  providers: [RefreshTokenService, LoginSessionService],
  exports: [RefreshTokenService, LoginSessionService],
})
export class AuthModule {}
