import { JWT_STRATEGY_CONFIG } from '@isyss-cdm/constants';
import { ICurrentUser } from '@isyss-cdm/interface';
import { Inject, Injectable } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  JwtFromRequestFunction,
  Strategy as JwtStrategyBase,
} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase) {
  constructor(@Inject(JWT_STRATEGY_CONFIG) config: JwtModuleOptions) {
    const jwtExtractor: JwtFromRequestFunction =
      ExtractJwt.fromAuthHeaderAsBearerToken();

    super({
      jwtFromRequest: jwtExtractor,
      ignoreExpiration: false,
      secretOrKey: config.secret,
    });
  }

  validate(payload: ICurrentUser): ICurrentUser {
    return payload;
  }
}
