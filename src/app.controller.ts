import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/:username/:repository")
  getCommits(
    @Param('username') username: string, 
    @Param('repository') repository: string
  ): any {  
    return this.appService.getCommits(username, repository);
  }
}
