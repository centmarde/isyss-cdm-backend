import { CatchHandlerService, CommonAuthModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginSessionService } from './login-session.service';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [CommonAuthModule],
  providers: [LoginSessionService, RefreshTokenService, CatchHandlerService],
  controllers: [AuthController],
})
export class AuthModule {}
