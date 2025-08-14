import { CommonMicroService } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ActivityService {
  private readonly logger = new Logger(ActivityService.name);

  constructor(private readonly commonMicroService: CommonMicroService) {
    //
  }
}
