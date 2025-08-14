import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [ActivityModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
