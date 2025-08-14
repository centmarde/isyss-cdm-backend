import { ActivityStatus, UserType } from '@isyss-cdm/enum';
import { ICurrentUser } from '@isyss-cdm/interface';
import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsEnum,
  IsIn,
  IsISO8601,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class DateRangeDTO {
  @ApiProperty({ example: '2024-01-01' })
  @IsNotEmpty()
  @IsString()
  @IsISO8601()
  from: string;

  @ApiProperty({ example: '2024-12-31' })
  @IsNotEmpty()
  @IsString()
  @IsISO8601()
  to: string;
}

export class GetMyActivitiesPayloadDTO {
  @ApiProperty({ example: '0' })
  @IsNotEmpty()
  @IsNumberString()
  page: number;

  @ApiProperty({ example: '10' })
  @IsNotEmpty()
  @IsNumberString()
  limit: number;

  @ApiPropertyOptional({ example: 'login' })
  @IsOptional()
  @ValidateIf((val: GetMyActivitiesPayloadDTO) => val.search !== '')
  @IsNotEmpty()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsIn(['asc', 'desc'])
  orderBy?: string = 'desc';

  @ApiPropertyOptional({
    type: DateRangeDTO,
    default: { from: '2024-01-01', to: '2024-12-12' },
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => DateRangeDTO)
  dateRange?: DateRangeDTO;

  @ApiProperty({ example: '' })
  currUser: ICurrentUser;
}

export class GetActivityParamDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID(4, { message: 'Invalid ID format.' })
  id?: string;
}

export class GetActivityQueryDTO extends PickType(GetMyActivitiesPayloadDTO, [
  'dateRange',
  'limit',
  'page',
  'search',
  'orderBy',
]) {
  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @ValidateIf((val: GetActivityQueryDTO) => val.isMe !== undefined)
  @IsNotEmpty()
  @IsBooleanString()
  isMe?: boolean;
}
export class CreateActivityPayloadDTO {
  @ApiProperty({ example: 'USER_LOGIN' })
  @IsString()
  action: string;

  @ApiProperty({ example: ActivityStatus.SUCCESS, enum: ActivityStatus })
  @IsEnum(ActivityStatus)
  status: ActivityStatus;

  @ApiPropertyOptional({ example: 'User logged in successfully.' })
  @IsOptional()
  @IsString()
  remarks?: string;

  @ApiPropertyOptional({
    example: { email: 'test@example.com', loginTime: '2025-07-04T12:00:00Z' },
    type: Object,
  })
  @IsOptional()
  @IsObject()
  affectedData?: Record<string, any>;

  @ApiProperty({ example: UserType.ADMIN, enum: UserType })
  @IsEnum(UserType)
  actorType: UserType;

  @ApiProperty({
    example: 'eb32f198-f51b-46f4-94a3-f2223a1d82bd',
  })
  @IsUUID()
  actorId: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  actorNameSnapshot?: string;

  @ApiPropertyOptional({ example: UserType.APPLICANT, enum: UserType })
  @IsOptional()
  @IsEnum(UserType)
  subjectType?: UserType;

  @ApiPropertyOptional({
    example: 'c3b9ef2e-88cb-4f85-848a-21bd0621dcba',
  })
  @IsOptional()
  @IsUUID()
  subjectId?: string | null;

  @ApiPropertyOptional({ example: 'Jane Smith' })
  @IsOptional()
  @IsString()
  subjectNameSnapshot?: string | null;

  @ApiPropertyOptional({ example: 'user-account' })
  @IsOptional()
  @IsString()
  module?: string;

  @ApiPropertyOptional({ example: 'user' })
  @IsOptional()
  @IsString()
  entity?: string;

  @ApiPropertyOptional({ example: 'USR-001' })
  @IsOptional()
  @IsString()
  entityId?: string;

  @ApiPropertyOptional({
    example: { oldEmail: 'a@test.com', newEmail: 'b@test.com' },
  })
  @IsOptional()
  @IsObject()
  before?: Record<string, any>;

  @ApiPropertyOptional({
    example: { oldEmail: 'a@test.com', newEmail: 'b@test.com' },
  })
  @IsOptional()
  @IsObject()
  after?: Record<string, any>;
}

export class ActivityDTO {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'USER_LOGIN' })
  @IsString()
  action: string;

  @ApiProperty({ enum: ActivityStatus, example: ActivityStatus.SUCCESS })
  @IsEnum(ActivityStatus)
  status: ActivityStatus;

  @ApiPropertyOptional({ example: 'User logged in successfully.' })
  @IsOptional()
  @IsString()
  remarks?: string;

  @ApiPropertyOptional({
    example: { ip: '192.168.0.1', browser: 'Chrome' },
    type: Object,
  })
  @IsOptional()
  @IsObject()
  affectedData?: Record<string, any>;

  @ApiProperty({ enum: UserType, example: UserType.ADMIN })
  @IsEnum(UserType)
  actorType: UserType;

  @ApiPropertyOptional({ example: 'eb32f198-f51b-46f4-94a3-f2223a1d82bd' })
  @IsOptional()
  @IsUUID()
  actorId?: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  actorNameSnapshot?: string;

  @ApiPropertyOptional({ enum: UserType, example: UserType.APPLICANT })
  @IsOptional()
  @IsEnum(UserType)
  subjectType?: UserType;

  @ApiPropertyOptional({ example: 'c3b9ef2e-88cb-4f85-848a-21bd0621dcba' })
  @IsOptional()
  @IsUUID()
  subjectId?: string;

  @ApiPropertyOptional({ example: 'Jane Smith' })
  @IsOptional()
  @IsString()
  subjectNameSnapshot?: string;

  @ApiPropertyOptional({ example: 'user-account' })
  @IsOptional()
  @IsString()
  module?: string;

  @ApiPropertyOptional({ example: 'user' })
  @IsOptional()
  @IsString()
  entity?: string;

  @ApiPropertyOptional({ example: 'USR-001' })
  @IsOptional()
  @IsString()
  entityId?: string;

  @ApiPropertyOptional({ example: { email: 'old@example.com' }, type: Object })
  @IsOptional()
  @IsObject()
  before?: Record<string, any>;

  @ApiPropertyOptional({ example: { email: 'new@example.com' }, type: Object })
  @IsOptional()
  @IsObject()
  after?: Record<string, any>;

  @ApiProperty({ example: '2025-08-10T10:00:00Z' })
  @IsString()
  createdAt: Date;

  @ApiProperty({ example: '2025-08-10T10:05:00Z' })
  @IsString()
  updatedAt: Date;
}

export class GetMyActivitiesResDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  data: ActivityDTO[];
}
