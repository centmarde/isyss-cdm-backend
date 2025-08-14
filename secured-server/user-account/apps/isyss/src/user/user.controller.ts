import {
  GetDeviceBySourceAndUserIdDTO,
  GetUserByIdentifierDTO,
  GetUserByUserIdPayloadDTO,
  UpdateUserLoginStatusDTO,
  ValidateUserLoginPayloadDTO,
} from '@isyss-cdm/dto';
import { Prisma } from '@isyss-cdm/user-account-schema';
import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    //
  }

  @MessagePattern('user.get.admin.by.user.id')
  async getAdminUserByUserIdRequest(
    @Payload() data: GetUserByUserIdPayloadDTO,
  ): Promise<string> {
    return JSON.stringify(await this.userService.getAdminUserByUserId(data));
  }

  @MessagePattern('user.get.applicant.by.user.id')
  async getApplicantUserByUserIdRequest(
    @Payload() data: GetUserByUserIdPayloadDTO,
  ): Promise<string> {
    return JSON.stringify(
      await this.userService.getApplicantUserByUserId(data),
    );
  }

  @MessagePattern('user.get.admin.user.by.identifier')
  async getAdminUserByIdentifier(
    @Payload() data: GetUserByIdentifierDTO,
  ): Promise<string> {
    return JSON.stringify(
      await this.userService.getAdminUserByIdentifier(data),
    );
  }

  @MessagePattern('user.validate.user.login')
  async validateUserLoginRequest(
    @Payload() data: ValidateUserLoginPayloadDTO,
  ): Promise<string> {
    return JSON.stringify(await this.userService.validateUserLogin(data));
  }

  @EventPattern('user.update.user.login.status')
  async updateUserLoginStatusRequest(
    @Payload() data: UpdateUserLoginStatusDTO,
  ): Promise<HttpStatus> {
    return await this.userService.updateUserLoginStatus(data);
  }

  @MessagePattern('user.get.device.by.source.and.user.id')
  async getDeviceBySourceAndUserIdRequest(
    @Payload() data: GetDeviceBySourceAndUserIdDTO,
  ): Promise<string> {
    return JSON.stringify(
      await this.userService.getDeviceBySourceAndUserId(data),
    );
  }

  @MessagePattern('user.create.user.device')
  async createUserDeviceRequest(
    @Payload() data: Prisma.UserDeviceCreateInput,
  ): Promise<string> {
    return JSON.stringify(await this.userService.createUserDevice(data));
  }
}
