import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class DestinationContentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}

  async getPointsOfInterestForAGivenLocationAndradius(
    latitude: number,
    longitude: number,
    radius: number,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      console.log(dataToken.access_token);

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${latitude}&longitude=${longitude}&radius=${
            radius || 1
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
      // console.log('abc');

      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async getPointsOfInterestForAGivenArea(
    north: number,
    west: number,
    south: number,
    east: number,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      console.log(dataToken.access_token);

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/reference-data/locations/pois/by-square?north=${north}&west=${west}&south=${south}&east=${east}&page%5Blimit%5D=10&page%5Boffset%5D=0`,
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

  async getOnePointOfInterestByItsId(poisId: string) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/reference-data/locations/pois/${poisId}`,
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

  async getActivitiesAroundAGivenLocation(
    latitude: number,
    longitude: number,
    radius: number,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/shopping/activities?latitude=${latitude}&longitude=${longitude}&radius=${
            radius || 1
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
    } catch (e) {
      console.log(e);
    }
  }

  async getActivitiesAroundAGivenLocation4Directions(
    north: number,
    west: number,
    south: number,
    east: number,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/shopping/activities/by-square?north=${north}&west=${west}&south=${south}&east=${east}`,
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
    } catch (e) {
      console.log(e);
    }
  }

  async getOneActivityByItsId(activityId: string) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/shopping/activities/${activityId}`,
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
    } catch (e) {
      console.log(e);
    }
  }

  async getCategoryRatedAreas(latitude: number, longitude: number) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/location/analytics/category-rated-areas?latitude=${latitude}&longitude=${longitude}`,
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
    } catch (e) {
      console.log(e);
    }
  }
}
