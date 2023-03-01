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

  async getListOfFlightAvailabilitiesBaseOnSearchingCriteria() {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .post(
          `https://test.api.amadeus.com/v1/shopping/availability/flight-availabilities`,
          {
            originDestinations: [
              {
                id: '1',
                originLocationCode: 'BOS',
                destinationLocationCode: 'MAD',
                departureDateTime: {
                  date: '2023-11-14',
                  time: '21:15:00',
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

  async getListOfUpsellFlightOffersBasedOnGivenFlightOffers() {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .post(
          `https://test.api.amadeus.com/v1/shopping/flight-offers/upselling`,
          {
            data: {
              type: 'flight-offers-upselling',
              flightOffers: [
                {
                  type: 'flight-offer',
                  id: '1',
                  source: 'GDS',
                  instantTicketingRequired: false,
                  nonHomogeneous: false,
                  oneWay: false,
                  lastTicketingDate: '2021-07-04',
                  numberOfBookableSeats: 2,
                  itineraries: [
                    {
                      duration: 'PT2H5M',
                      segments: [
                        {
                          departure: {
                            iataCode: 'CDG',
                            terminal: '2F',
                            at: '2021-07-04T09:30:00',
                          },
                          arrival: {
                            iataCode: 'MAD',
                            terminal: '2',
                            at: '2021-07-04T11:35:00',
                          },
                          carrierCode: 'AF',
                          number: '1300',
                          aircraft: {
                            code: '321',
                          },
                          operating: {
                            carrierCode: 'AF',
                          },
                          duration: 'PT2H5M',
                          id: '2',
                          numberOfStops: 0,
                          blacklistedInEU: false,
                        },
                      ],
                    },
                    {
                      duration: 'PT1H55M',
                      segments: [
                        {
                          departure: {
                            iataCode: 'MAD',
                            terminal: '2',
                            at: '2021-07-11T18:35:00',
                          },
                          arrival: {
                            iataCode: 'ORY',
                            terminal: '1',
                            at: '2021-07-11T20:30:00',
                          },
                          carrierCode: 'AF',
                          number: '9433',
                          aircraft: {
                            code: '318',
                          },
                          operating: {
                            carrierCode: 'AF',
                          },
                          duration: 'PT1H55M',
                          id: '14',
                          numberOfStops: 0,
                          blacklistedInEU: false,
                        },
                      ],
                    },
                  ],
                  price: {
                    currency: 'EUR',
                    total: '410.86',
                    base: '240.00',
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
                    grandTotal: '410.86',
                    additionalServices: [
                      {
                        amount: '60.00',
                        type: 'CHECKED_BAGS',
                      },
                    ],
                  },
                  pricingOptions: {
                    fareType: ['PUBLISHED'],
                    includedCheckedBagsOnly: false,
                  },
                  validatingAirlineCodes: ['AF'],
                  travelerPricings: [
                    {
                      travelerId: '1',
                      fareOption: 'STANDARD',
                      travelerType: 'ADULT',
                      price: {
                        currency: 'EUR',
                        total: '201.96',
                        base: '126.00',
                      },
                      fareDetailsBySegment: [
                        {
                          segmentId: '2',
                          cabin: 'ECONOMY',
                          fareBasis: 'AS50OALG',
                          brandedFare: 'LIGHT1',
                          class: 'A',
                          includedCheckedBags: {
                            quantity: 0,
                          },
                        },
                        {
                          segmentId: '14',
                          cabin: 'ECONOMY',
                          fareBasis: 'VS50OALG',
                          brandedFare: 'LIGHT1',
                          class: 'V',
                          includedCheckedBags: {
                            quantity: 0,
                          },
                        },
                      ],
                    },
                    {
                      travelerId: '2',
                      fareOption: 'STANDARD',
                      travelerType: 'CHILD',
                      price: {
                        currency: 'EUR',
                        total: '176.96',
                        base: '101.00',
                      },
                      fareDetailsBySegment: [
                        {
                          segmentId: '2',
                          cabin: 'ECONOMY',
                          fareBasis: 'AS50OALG',
                          brandedFare: 'LIGHT1',
                          class: 'A',
                        },
                        {
                          segmentId: '14',
                          cabin: 'ECONOMY',
                          fareBasis: 'VS50OALG',
                          brandedFare: 'LIGHT1',
                          class: 'V',
                        },
                      ],
                    },
                    {
                      travelerId: '3',
                      fareOption: 'STANDARD',
                      travelerType: 'HELD_INFANT',
                      associatedAdultId: '1',
                      price: {
                        currency: 'EUR',
                        total: '31.94',
                        base: '13.00',
                      },
                      fareDetailsBySegment: [
                        {
                          segmentId: '2',
                          cabin: 'ECONOMY',
                          fareBasis: 'AS50OALG',
                          brandedFare: 'LIGHT1',
                          class: 'A',
                        },
                        {
                          segmentId: '14',
                          cabin: 'ECONOMY',
                          fareBasis: 'VS50OALG',
                          brandedFare: 'LIGHT1',
                          class: 'V',
                        },
                      ],
                    },
                  ],
                  fareRules: {
                    rules: [
                      {
                        category: 'EXCHANGE',
                        maxPenaltyAmount: '0.00',
                      },
                      {
                        category: 'REVALIDATION',
                        notApplicable: true,
                      },
                    ],
                  },
                },
              ],
              payments: [
                {
                  brand: 'VISA_IXARIS',
                  binNumber: 123456,
                  flightOfferIds: [1],
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

  async getAllTheSeatMapsOfAGivenOrder() {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/shopping/seatmaps?flightOrderId=MlpZVkFMfFdBVFNPTnwyMDE1LTExLTAy&flight-orderId=MlpZVkFMfFdBVFNPTnwyMDE1LTExLTAy`,
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

  async getAllTheSeatMapsOfAGivenFlightOffer() {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .post(
          `https://test.api.amadeus.com/v1/shopping/seatmaps`,
          {
            data: [
              {
                type: 'flight-offer',
                id: '1',
                source: 'GDS',
                instantTicketingRequired: false,
                nonHomogeneous: false,
                oneWay: false,
                lastTicketingDate: '2023-08-01',
                numberOfBookableSeats: 9,
                itineraries: [
                  {
                    duration: 'PT1H30M',
                    segments: [
                      {
                        departure: {
                          iataCode: 'NCE',
                          terminal: '2',
                          at: '2023-08-01T06:45:00',
                        },
                        arrival: {
                          iataCode: 'ORY',
                          terminal: '2',
                          at: '2023-08-01T08:15:00',
                        },
                        carrierCode: 'AF',
                        number: '6201',
                        aircraft: {
                          code: '320',
                        },
                        operating: {
                          carrierCode: 'AF',
                        },
                        duration: 'PT1H30M',
                        id: '1',
                        numberOfStops: 0,
                        blacklistedInEU: false,
                      },
                    ],
                  },
                  {
                    duration: 'PT1H25M',
                    segments: [
                      {
                        departure: {
                          iataCode: 'ORY',
                          terminal: '3',
                          at: '2023-08-18T06:35:00',
                        },
                        arrival: {
                          iataCode: 'NCE',
                          terminal: '2',
                          at: '2023-08-18T08:00:00',
                        },
                        carrierCode: 'AF',
                        number: '6200',
                        aircraft: {
                          code: '320',
                        },
                        operating: {
                          carrierCode: 'AF',
                        },
                        duration: 'PT1H25M',
                        id: '4',
                        numberOfStops: 0,
                        blacklistedInEU: false,
                      },
                    ],
                  },
                ],
                price: {
                  currency: 'EUR',
                  total: '274.60',
                  base: '80.00',
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
                  grandTotal: '274.60',
                  additionalServices: [
                    {
                      amount: '60.00',
                      type: 'CHECKED_BAGS',
                    },
                  ],
                },
                pricingOptions: {
                  fareType: ['PUBLISHED'],
                  includedCheckedBagsOnly: false,
                },
                validatingAirlineCodes: ['AF'],
                travelerPricings: [
                  {
                    travelerId: '1',
                    fareOption: 'STANDARD',
                    travelerType: 'ADULT',
                    price: {
                      currency: 'EUR',
                      total: '137.30',
                      base: '40.00',
                    },
                    fareDetailsBySegment: [
                      {
                        segmentId: '1',
                        cabin: 'ECONOMY',
                        fareBasis: 'XS50MALG',
                        brandedFare: 'LIGHT',
                        class: 'X',
                        includedCheckedBags: {
                          quantity: 0,
                        },
                      },
                      {
                        segmentId: '4',
                        cabin: 'ECONOMY',
                        fareBasis: 'XS50MALG',
                        brandedFare: 'LIGHT',
                        class: 'X',
                        includedCheckedBags: {
                          quantity: 0,
                        },
                      },
                    ],
                  },
                  {
                    travelerId: '2',
                    fareOption: 'STANDARD',
                    travelerType: 'ADULT',
                    price: {
                      currency: 'EUR',
                      total: '137.30',
                      base: '40.00',
                    },
                    fareDetailsBySegment: [
                      {
                        segmentId: '1',
                        cabin: 'ECONOMY',
                        fareBasis: 'XS50MALG',
                        brandedFare: 'LIGHT',
                        class: 'X',
                        includedCheckedBags: {
                          quantity: 0,
                        },
                      },
                      {
                        segmentId: '4',
                        cabin: 'ECONOMY',
                        fareBasis: 'XS50MALG',
                        brandedFare: 'LIGHT',
                        class: 'X',
                        includedCheckedBags: {
                          quantity: 0,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
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
}
