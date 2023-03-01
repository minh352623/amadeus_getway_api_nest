import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class Covid19Service {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}

  async getCovid19Report() {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

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

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllLocationSafety(latitude: any, longitude: any) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/safety/safety-rated-locations?latitude=${
            latitude || 41.397158
          }&longitude=${
            longitude || 2.160873
          }&radius=1&page%5Blimit%5D=10&page%5Boffset%5D=0`,
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

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getRatingLocationSafaty(north: any, west: any, south: any, east: any) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/safety/safety-rated-locations/by-square?north=${
            north || 41.397158
          }&west=${west || 2.160873}&south=${south || 41.394582}&east=${
            east || 2.177181
          }&page%5Blimit%5D=10&page%5Boffset%5D=0`,
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

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getInfoLOcationById(id: string) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/safety/safety-rated-locations/${
            id || 'Q930402719'
          }`,
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

      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
