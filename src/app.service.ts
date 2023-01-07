import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { Commit } from './interfaces/commit.interface';

// URL to get the commits
const gitHubUrl = "https://api.github.com/repos/";

@Injectable()
export class AppService {

  constructor(private httpService: HttpService) { }

  //Method to get commits from the repository
  getCommits(username: string, repository: string): Observable<AxiosResponse<Commit>> {
    const commitUrl = `${gitHubUrl}${username}/${repository}/commits`;

    try {
      const response = this.httpService.get(commitUrl)
        .pipe(
          map((response) => {
            // Only getting the object commit and the url to see the changes
            return response.data.map(({ commit, html_url }) => {
              const { author, committer, message, tree } = commit;
              return { author, committer, message, tree, html_url };
            })
          })
        );
      return response;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

}