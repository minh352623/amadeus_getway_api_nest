import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
@Injectable()
export class HotelService {
  constructor(private readonly httpService: HttpService) {}
  getHotels(): Observable<AxiosResponse<object>> {
    try {
      const data = this.httpService
        .get(
          'https://test.api.amadeus.com/v2/duty-of-care/diseases/covid19-area-report?countryCode=US&cityCode=NYC&language=EN',
          {
            headers: {
              Authorization: 'Bearer nMpeHzPzAhqF12ZDUyGXHIwk1hPA',
            },
          },
        )
        .pipe(
          map((axiosResponse: AxiosResponse) => {
            return axiosResponse.data;
          }),
        );
      console.log('abc');

      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
