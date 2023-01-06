import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Commit } from './interfaces/commit.interface';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/:username/:repository")
  getCommits(
    @Param('username') username: string, 
    @Param('repository') repository: string
  ): Observable<AxiosResponse<Commit>> {  
    return this.appService.getCommits(username, repository);
  }
}
