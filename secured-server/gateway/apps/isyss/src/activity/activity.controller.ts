import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivityService } from './activity.service';

@ApiTags('Activity Logs')
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {
    //
  }

  // @Get(':id?')
  // @Version('1')
  // @ApiDoc('getActivities')
  // @UseGuards(
  //   JwtAuthGuard,
  //   IsUserNotInactiveGuard,
  //   IsAdminGuard,
  //   IsValidLoginSessionGuard,
  //   IsValidEnvGuard,
  // )
  // async getMyActivities(
  //   @Query() query: GetMeActivityQueryDTO,
  //   @CurrentUser() currUser: ICurrentUser,
  // ): Promise<ActivityListResDTO> {
  //   return this.activityService.getMeActivity(query, currUser);
  // }
}
