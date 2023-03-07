import { HttpService } from '@nestjs/axios/dist';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { HotelEntity } from './hotel.entity';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HotelService implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
    // @InjectRepository(HotelEntity)
    // private readonly hotelsRepository: Repository<HotelEntity>,
    @InjectModel(Hotel.name)
    private hotelModel: Model<HotelDocument>,
  ) {}

  onModuleInit() {
    console.log('onModuleI');
  }

  //graphql

  async saveHotel(data: object): Promise<Hotel> {
    try {
      return new this.hotelModel(data).save();
    } catch (e) {
      console.log(e);
    }
  }
  async getHotels(keyword: string): Promise<Hotel[]> {
    try {
      const filter = {
        $or: [
          {
            name: new RegExp(keyword, 'i'),
          },
          {
            hotelId: new RegExp(keyword, 'i'),
          },
          {
            iataCode: new RegExp(keyword, 'i'),
          },
        ],
      };
      const data = await this.hotelModel.find(filter);

      const length = data.length;

      if (length == 0) {
        console.log('call api amadeus');

        const data = await this.getHotelsInACity(keyword, 100);
        this.hotelModel.insertMany(data);
        return data;
      }

      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async getHotel(id: string[]): Promise<Hotel> {
    try {
      const data = await this.hotelModel.findOne({
        hotelId: id,
      });
      console.log(data);
      if (!data) {
        console.log('call hotel amadeus');

        const hotel = await this.getHotelsUsingItsUniqueId(id);
        this.saveHotel(hotel);
        return hotel;
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  //contorller
  async getHotelsUsingItsUniqueId(hotelIds: string[]) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const response = await this.httpService
        .get(
          `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-hotels?hotelIds=${hotelIds}`,
          {
            headers: {
              Authorization: 'Bearer ' + dataToken?.access_token,
            },
          },
        )
        .toPromise();
      console.log(response.data.data[0]);

      if (!response.data.data[0])
        return {
          message: 'Hotel dose not exist',
        };
      return response.data.data[0];
    } catch (e) {
      console.log(e);
    }
  }
  async getHotelsUsingItsUniqueIdVer2(hotelIds: string[]) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const response = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-hotels?hotelIds=${hotelIds}`,
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

      if (!response)
        return {
          message: 'Hotel dose not exist',
        };
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async getHotelsInACity(
    cityCode: string,
    radius: number,
    radiusUnit: string = 'KM',
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      console.log(dataToken.access_token);

      const response = await this.httpService
        .get(
          `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=${
            radius || 5
          }&radiusUnit=${radiusUnit || 'KM'}&hotelSource=ALL`,
          {
            headers: {
              Authorization: 'Bearer ' + dataToken?.access_token,
            },
          },
        )
        .toPromise();
      // .pipe(
      //   map((axiosResponse: AxiosResponse) => {
      //     return axiosResponse.data;
      //   }),
      // );
      // console.log(response.data.data);

      // await this.hotelModel.insertMany(response.data.data);

      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  }

  async getHotelsInGeocode(
    latitude: number,
    longitude: number,
    radius: number,
    radiusUnit: string,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      console.log(dataToken.access_token);

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${latitude}&longitude=${longitude}&radius=${
            radius || 5
          }&radiusUnit=${radiusUnit || 'KM'}&hotelSource=ALL`,
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

  async getMultiHotelOffers(
    hotelIds: string[],
    adults: number = 1,
    checkInDate: string = '2023-11-22',
    checkOutDate: string,
    countryOfResidence: string,
    roomQuantity: number,
    priceRange: string,
    currency: string,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      console.log(dataToken.access_token);

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelIds}&adults=${
            adults || 1
          }&checkInDate=${checkInDate || '2023-11-22'}&roomQuantity=${
            roomQuantity || 1
          }&paymentPolicy=NONE&bestRateOnly=true`,
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
  async getOfferPricing(offerId: string) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      console.log(dataToken.access_token);

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v3/shopping/hotel-offers/${offerId}`,
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

  async hotelBooking() {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .post(
          `https://test.api.amadeus.com/v1/booking/hotel-bookings`,
          {
            data: {
              offerId: 'NRPQNQBOJM',
              guests: [
                {
                  name: {
                    title: 'MR',
                    firstName: 'BOB',
                    lastName: 'SMITH',
                  },
                  contact: {
                    phone: '+33679278416',
                    email: 'bob.smith@email.com',
                  },
                },
              ],
              payments: [
                {
                  method: 'creditCard',
                  card: {
                    vendorCode: 'VI',
                    cardNumber: '4111111111111111',
                    expiryDate: '2026-01',
                  },
                },
              ],
            },
          },
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
      console.log('abc');
      return err;
    }
  }

  async getSentimentsByAmadeusHotelIds(hotelIds: string[]) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      console.log(dataToken.access_token);

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments?hotelIds=${hotelIds}`,
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

  async getAListOfHotelsMatchingAGivenKeyword(
    keyword: string,
    subType: string[],
    countryCode: string,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      console.log(dataToken.access_token);

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/reference-data/locations/hotel?keyword=${keyword}&subType=${subType}&countryCode=${
            countryCode || 'FR'
          }&lang=EN&max=20`,
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
