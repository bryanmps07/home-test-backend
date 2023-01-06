import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';

const gitHubUrl = "https://api.github.com/repos/";

@Injectable()
export class AppService {

  constructor(private httpService: HttpService) {}

  
   getCommits(username: string, repository: string): Observable<AxiosResponse<any>> {
    const commitUrl = `${gitHubUrl}${username}/${repository}/commits`;
    
    try {
      const response =  this.httpService.get(commitUrl)
      .pipe( 
        map((response) => response.data)
      );
      return response;
      
    } catch (error) {
      throw new InternalServerErrorException();
    }    
  }

}