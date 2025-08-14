import { Injectable } from '@nestjs/common';
import { CommonMicroService } from '../../microservice';

@Injectable()
export class EventsService {
  constructor(private readonly commonMicroService: CommonMicroService) {
    //
  }
}
