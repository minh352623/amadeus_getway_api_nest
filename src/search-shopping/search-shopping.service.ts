import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class SearchShoppingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}
  async getAirportDirectRoutes(departureAirportCode: string) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/airport/direct-destinations?departureAirportCode=${
            departureAirportCode || 'BLR'
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

  async getAirlineDestinations(airlineCode: string) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/airline/destinations?airlineCode=${
            airlineCode || 'BA'
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

  async getListFlightOffersCriteria(
    originLocationCode: string,
    destinationLocationCode: string,
    departureDate: string,
    adults: number,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${
            originLocationCode || 'SYD'
          }&destinationLocationCode=${
            destinationLocationCode || 'BKK'
          }&departureDate=${departureDate || '2023-05-02'}&adults=${
            adults || 1
          }&nonStop=false&max=250`,
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

  async getListFlightOffersCriteriaPost() {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .post(
          `https://test.api.amadeus.com/v2/shopping/flight-offers`,
          {
            currencyCode: 'USD',
            originDestinations: [
              {
                id: '1',
                originLocationCode: 'NYC',
                destinationLocationCode: 'MAD',
                departureDateTimeRange: {
                  date: '2023-11-01',
                  time: '10:00:00',
                },
              },
            ],
            travelers: [
              {
                id: '1',
                travelerType: 'ADULT',
              },
            ],
            sources: ['GDS'],
            searchCriteria: {
              maxFlightOffers: 2,
              flightFilters: {
                cabinRestrictions: [
                  {
                    cabin: 'BUSINESS',
                    coverage: 'MOST_SEGMENTS',
                    originDestinationIds: ['1'],
                  },
                ],
              },
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

  async confirmPricingOfGivenFlightOffers() {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .post(
          `https://test.api.amadeus.com/v1/shopping/flight-offers/pricing?forceClass=false`,
          JSON.stringify({
            data: {
              type: 'flight-offers-pricing',
              flightOffers: [
                {
                  type: 'flight-offer',
                  id: '1',
                  source: 'GDS',
                  instantTicketingRequired: false,
                  nonHomogeneous: false,
                  oneWay: false,
                  lastTicketingDate: '2020-08-04',
                  numberOfBookableSeats: 9,
                  itineraries: [
                    {
                      duration: 'PT32H15M',
                      segments: [
                        {
                          departure: {
                            iataCode: 'SYD',
                            terminal: '1',
                            at: '2021-02-01T19:15:00',
                          },
                          arrival: {
                            iataCode: 'SIN',
                            terminal: '1',
                            at: '2021-02-02T00:30:00',
                          },
                          carrierCode: 'TR',
                          number: '13',
                          aircraft: {
                            code: '789',
                          },
                          operating: {
                            carrierCode: 'TR',
                          },
                          duration: 'PT8H15M',
                          id: '1',
                          numberOfStops: 0,
                          blacklistedInEU: false,
                        },
                        {
                          departure: {
                            iataCode: 'SIN',
                            terminal: '1',
                            at: '2021-02-02T22:05:00',
                          },
                          arrival: {
                            iataCode: 'DMK',
                            terminal: '1',
                            at: '2021-02-02T23:30:00',
                          },
                          carrierCode: 'TR',
                          number: '868',
                          aircraft: {
                            code: '788',
                          },
                          operating: {
                            carrierCode: 'TR',
                          },
                          duration: 'PT2H25M',
                          id: '2',
                          numberOfStops: 0,
                          blacklistedInEU: false,
                        },
                      ],
                    },
                    {
                      duration: 'PT15H',
                      segments: [
                        {
                          departure: {
                            iataCode: 'DMK',
                            terminal: '1',
                            at: '2021-02-05T23:15:00',
                          },
                          arrival: {
                            iataCode: 'SIN',
                            terminal: '1',
                            at: '2021-02-06T02:50:00',
                          },
                          carrierCode: 'TR',
                          number: '867',
                          aircraft: {
                            code: '788',
                          },
                          operating: {
                            carrierCode: 'TR',
                          },
                          duration: 'PT2H35M',
                          id: '5',
                          numberOfStops: 0,
                          blacklistedInEU: false,
                        },
                        {
                          departure: {
                            iataCode: 'SIN',
                            terminal: '1',
                            at: '2021-02-06T06:55:00',
                          },
                          arrival: {
                            iataCode: 'SYD',
                            terminal: '1',
                            at: '2021-02-06T18:15:00',
                          },
                          carrierCode: 'TR',
                          number: '12',
                          aircraft: {
                            code: '789',
                          },
                          operating: {
                            carrierCode: 'TR',
                          },
                          duration: 'PT8H20M',
                          id: '6',
                          numberOfStops: 0,
                          blacklistedInEU: false,
                        },
                      ],
                    },
                  ],
                  price: {
                    currency: 'EUR',
                    total: '546.70',
                    base: '334.00',
                    fees: [
                      {
                        amount: '0.00',
                        type: 'SUPPLIER',
                      },
                      {
                        amount: '0.00',
                        type: 'TICKETING',
                      },
                    ],
                    grandTotal: '546.70',
                  },
                  pricingOptions: {
                    fareType: ['PUBLISHED'],
                    includedCheckedBagsOnly: true,
                  },
                  validatingAirlineCodes: ['HR'],
                  travelerPricings: [
                    {
                      travelerId: '1',
                      fareOption: 'STANDARD',
                      travelerType: 'ADULT',
                      price: {
                        currency: 'EUR',
                        total: '546.70',
                        base: '334.00',
                      },
                      fareDetailsBySegment: [
                        {
                          segmentId: '1',
                          cabin: 'ECONOMY',
                          fareBasis: 'O2TR24',
                          class: 'O',
                          includedCheckedBags: {
                            weight: 20,
                            weightUnit: 'KG',
                          },
                        },
                        {
                          segmentId: '2',
                          cabin: 'ECONOMY',
                          fareBasis: 'O2TR24',
                          class: 'O',
                          includedCheckedBags: {
                            weight: 20,
                            weightUnit: 'KG',
                          },
                        },
                        {
                          segmentId: '5',
                          cabin: 'ECONOMY',
                          fareBasis: 'X2TR24',
                          class: 'X',
                          includedCheckedBags: {
                            weight: 20,
                            weightUnit: 'KG',
                          },
                        },
                        {
                          segmentId: '6',
                          cabin: 'ECONOMY',
                          fareBasis: 'H2TR24',
                          class: 'H',
                          includedCheckedBags: {
                            weight: 20,
                            weightUnit: 'KG',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          }),
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

  async findTheCheapestDestinationsFromLocationOfYou(origin: string) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${
            origin || 'MAD'
          }&oneWay=false&nonStop=false`,
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

  async findTheCheapestFlightDatesFromAnOriginToADestination(
    origin: string,
    destination: string,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/shopping/flight-dates?origin=${
            origin || 'MAD'
          }&destination=${destination || 'MUC'}&oneWay=false&nonStop=false`,
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
}
