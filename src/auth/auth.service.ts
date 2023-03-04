import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  getAccessToken(): Observable<AxiosResponse<object>> {
    try {
      const data = this.httpService
        .post(
          'https://test.api.amadeus.com/v1/security/oauth2/token',
          {
            grant_type: 'client_credentials',
            client_id: 'ZBzk8bBqmnbXOKEtjr7L94qMIZ14snAj',
            client_secret: 'kYzXS5Y91CTx8IGV',
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .pipe(
          map((axiosResponse: AxiosResponse) => {
            return axiosResponse.data;
          }),
        );
      // .subscribe((data) => {
      //   console.log(data);
      //   //   return data;
      // });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
