import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ActivityModule } from './activity/activity.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CommonModule, AuthModule, ActivityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
