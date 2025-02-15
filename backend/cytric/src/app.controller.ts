import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('GETTO')
  getHello(): string {
    return this.appService.getHello();
  }

  
  @Get('get')
  getHellso(): string {
    return this.appService.getHello();
  }
}
