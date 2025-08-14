import { Module } from '@nestjs/common';
import { CommonPrismaModule } from '../prisma';
import { AdminService } from './admin.service';
import { ApplicantService } from './applicant.service';
import { DeviceService } from './device.service';
import { UserService } from './user.service';

@Module({
  imports: [CommonPrismaModule],
  providers: [UserService, AdminService, ApplicantService, DeviceService],
  exports: [UserService, AdminService, ApplicantService, DeviceService],
})
export class UserModule {}
