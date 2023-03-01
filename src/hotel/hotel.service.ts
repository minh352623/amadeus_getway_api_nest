import { HttpService } from '@nestjs/axios/dist';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class HotelService implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}

  onModuleInit() {
    console.log('onModuleI');
  }

  async getHotels() {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      console.log(dataToken.access_token);

      const data = this.httpService
        .get(
          'https://test.api.amadeus.com/v2/duty-of-care/diseases/covid19-area-report?countryCode=US&cityCode=NYC&language=EN',
          {
            headers: {
              Authorization: 'Bearer ' + dataToken?.access_token,
            },
          },
        )
        .pipe(
          map((axiosResponse: AxiosResponse) => {
            return axiosResponse.data;
          }),
        );
      // console.log('abc');

      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
