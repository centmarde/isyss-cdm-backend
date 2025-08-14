import {
  LoginFailedDTO,
  LoginSuccessDTO,
  LogoutSuccessDTO,
} from '@isyss-cdm/dto';
import { EventName } from '@isyss-cdm/enum';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommonMicroService } from '../../microservice';

@Injectable()
export class EventsService {
  constructor(private readonly micro: CommonMicroService) {
    //
  }

  // * Authentication
  @OnEvent(EventName.LOGIN_SUCCESS, { async: true })
  async handleLoginSuccessApiEvents(payload: LoginSuccessDTO) {
    await this.micro.activityLogsService('activity.create.activity', {
      ...payload.activity,
    });
  }

  @OnEvent(EventName.LOGIN_FAILED, { async: true })
  async handleLoginFailedApiEvents(payload: LoginFailedDTO) {
    await this.micro.activityLogsService('activity.create.activity', {
      ...payload.activity,
    });
  }

  @OnEvent(EventName.LOGOUT_SUCCESS, { async: true })
  async handleLogoutSuccessApiEvents(payload: LogoutSuccessDTO) {
    await this.micro.activityLogsService('activity.create.activity', {
      ...payload.activity,
    });
  }
}
