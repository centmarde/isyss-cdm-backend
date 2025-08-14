import {
  apiMessage,
  CatchHandlerService,
  CommonMicroService,
  encrypt,
  envConfig,
  validatePassword,
} from '@app/common';
import {
  ACCESS_COOKIE,
  cookieConfig,
  REFRESH_COOKIE,
} from '@isyss-cdm/constants';
import {
  LoginBodyDTO,
  LoginPayloadDTO,
  LoginResDTO,
  LogoutPayloadDTO,
} from '@isyss-cdm/dto';
import {
  ActivityStatus,
  EnvType,
  EventName,
  UserActivity,
  UserType,
} from '@isyss-cdm/enum';
import { CustomApiResponse } from '@isyss-cdm/exception';
import {
  AdminUser,
  ApplicantUser,
  UserDevice,
} from '@isyss-cdm/user-account-schema';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { isEmail } from 'class-validator';
import { randomUUID } from 'crypto';
import * as useragent from 'express-useragent';
import * as ms from 'ms';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
    private readonly catchHandler: CatchHandlerService,
    private readonly commonMicroService: CommonMicroService,
  ) {
    //
  }

  async loginAdmin(data: LoginPayloadDTO): Promise<LoginResDTO> {
    let user: AdminUser = null;
    const { ipAddress, body, userAgent } = data;

    return this.catchHandler.handleAsync(
      async () => {
        const userData = await this.commonMicroService.userAccountService(
          'user.get.admin.user.by.identifier',
          {
            identifier: body.identifier,
            isUsername: !isEmail(body.identifier),
          },
        );

        user = userData;
        if (!user) {
          throw new CustomApiResponse(apiMessage['SEC4010002']);
        }

        if (!validatePassword(body.password, user.password, user.salt)) {
          throw new CustomApiResponse(apiMessage['SEC4010002']);
        }

        const { isActiveUser, message } =
          await this.commonMicroService.userAccountService(
            'user.validate.user.login',
            {
              userId: user.id,
              type: UserType.ADMIN,
            },
          );

        if (!isActiveUser) {
          throw new CustomApiResponse({
            code: 'SEC4000005',
            statusCode: 400,
            message,
          });
        }

        const { browser, source } = useragent.parse(userAgent);

        let device = await this.commonMicroService.userAccountService(
          'user.get.device.by.source.and.user.id',
          {
            userId: user.id,
            userType: UserType.ADMIN,
            source: source,
          },
        );

        if (!device) {
          device = await this.commonMicroService.userAccountService(
            'user.create.user.device',
            {
              ...body.device,
              ipAddress,
              browser,
              source,
              uuid: '',
              verified: true,
              admin: {
                connect: { id: user.id },
              },
              applicant: null,
            },
          );
        }

        return this.getLoginResponse(
          user,
          UserType.ADMIN,
          device,
          userAgent,
          ipAddress,
          body,
        );
      },
      {
        action: UserActivity.LOGIN,
        actorId: user?.id || null,
        actorType: UserType.ADMIN,
        actorData: user,
        module: 'auth',
        failureEvent: EventName.LOGIN_FAILED,
        activityData: {
          affectedData: { userAgent, ipAddress, ...body },
        },
      },
    );
  }

  private async getLoginResponse(
    userData: AdminUser | ApplicantUser,
    userType: UserType,
    device: UserDevice,
    userAgent: string,
    ipAddress: string,
    body: LoginBodyDTO,
  ): Promise<LoginResDTO> {
    const { refreshToken: token, env } = envConfig();

    await this.commonMicroService.cachingService('auth.create.login.session', {
      userId: userData.id,
      userType,
      deviceId: randomUUID(),
    });

    // Use the value from `token.tokenExpiration` for `expiresIn`
    const jwtToken = this.jwtService.sign(
      {},
      {
        secret: token.tokenSecretKey,
        expiresIn: token.tokenExpiration, // Use the expiration value from the environment
      },
    );

    const encryptedToken = encrypt(jwtToken);
    const refreshToken = `${encryptedToken.iv}.${encryptedToken.content}`;

    // Calculate refresh token expiration timestamp based on `token.tokenExpiration`
    const expirationTimestamp = new Date(
      Date.now() + ms(token.tokenExpiration),
    );

    await this.commonMicroService.cachingService('auth.create.refresh.token', {
      userId: userData.id,
      userType,
      deviceId: device?.id ?? undefined,
      token: refreshToken,
      expiration: expirationTimestamp.toISOString(),
    });

    if (userData) {
      await this.commonMicroService.userAccountService(
        'user.update.user.login.status',
        {
          userId: userData.id,
          userType,
          isLoggedIn: true,
        },
      );
    }

    const accessToken = this.jwtService.sign({
      id: userData.id,
      email: userData.email,
      username: userData.username,
      type: userType,
      env: env || EnvType.DEV,
    });

    this.eventEmitter.emit(EventName.LOGIN_SUCCESS, {
      activity: {
        action: UserActivity.LOGIN,
        status: ActivityStatus.SUCCESS,
        actorId: userData.id,
        actorType: userType,
        actorNameSnapshot: `${userData.lastName}, ${userData.firstName}`,
        module: 'auth',
        affectedData: {
          userAgent,
          ipAddress,
          ...body,
        },
      },
    });

    return {
      response: {
        email: userData.email,
        type: userType,
      },
      cookies: [
        {
          name: REFRESH_COOKIE,
          value: refreshToken,
          options: cookieConfig,
        },
        {
          name: ACCESS_COOKIE,
          value: accessToken,
          options: cookieConfig,
        },
      ],
    };
  }

  async logout(data: LogoutPayloadDTO) {
    const { currUser, refreshToken, token } = data;

    return this.catchHandler.handleAsync(
      async () => {
        if (currUser) {
          await this.commonMicroService.userAccountService(
            'user.update.user.login.status',
            {
              userId: currUser.id,
              userType: currUser.type,
              isLoggedIn: false,
            },
          );
        }

        if (!refreshToken) return true;

        const { refreshToken: tokenData } =
          await this.commonMicroService.cachingService(
            'auth.get.refresh.token',
            { refreshToken },
          );
        if (!tokenData) return true;

        await this.commonMicroService.cachingService(
          'auth.delete.refresh.token',
          {
            id: tokenData.id,
          },
        );

        if (token) {
          await this.commonMicroService.cachingService(
            'caching.black.list.token',
            {
              token,
              ttlSeconds: 3600000,
            },
          );
        }

        return true;
      },
      {
        action: UserActivity.LOGOUT,
        actorId: currUser?.id || null,
        actorType: currUser.type,
        actorData: currUser,
        module: 'auth',
        successEvent: EventName.LOGOUT_SUCCESS,
        activityData: {
          affectedData: null,
        },
      },
    );
  }
}
