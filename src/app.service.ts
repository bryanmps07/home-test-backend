import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { Commit } from './interfaces/commit.interface';

const gitHubUrl = "https://api.github.com/repos/";

@Injectable()
export class AppService {

  constructor(private httpService: HttpService) {}

  
   getCommits(username: string, repository: string): Observable<AxiosResponse<Commit>> {
    const commitUrl = `${gitHubUrl}${username}/${repository}/commits`;
    
    try {
      const response =  this.httpService.get(commitUrl)
      .pipe( 
        map((response) => {
          return response.data.map(({commit, html_url}) => {
            const {author, committer, message, tree} = commit;
            return {author, committer, message, tree, html_url};
          })
        })
      );
      return response;
      
    } catch (error) {
      throw new InternalServerErrorException();
    }    
  }

}