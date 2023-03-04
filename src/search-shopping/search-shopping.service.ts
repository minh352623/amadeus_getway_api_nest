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

  async createOrderAssociatedToTheFlightOffers() {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .post(
          `https://test.api.amadeus.com/v1/booking/flight-orders`,
          {
            data: {
              type: 'flight-order',
              flightOffers: [
                {
                  type: 'flight-offer',
                  id: '1',
                  source: 'GDS',
                  instantTicketingRequired: false,
                  nonHomogeneous: false,
                  paymentCardRequired: false,
                  lastTicketingDate: '2020-03-01',
                  itineraries: [
                    {
                      segments: [
                        {
                          departure: {
                            iataCode: 'GIG',
                            terminal: '2',
                            at: '2020-03-01T21:05:00',
                          },
                          arrival: {
                            iataCode: 'CDG',
                            terminal: '2E',
                            at: '2020-03-02T12:20:00',
                          },
                          carrierCode: 'KL',
                          number: '2410',
                          aircraft: {
                            code: '772',
                          },
                          operating: {
                            carrierCode: 'AF',
                          },
                          duration: 'PT11H15M',
                          id: '40',
                          numberOfStops: 0,
                        },
                        {
                          departure: {
                            iataCode: 'CDG',
                            terminal: '2F',
                            at: '2020-03-02T14:30:00',
                          },
                          arrival: {
                            iataCode: 'AMS',
                            at: '2020-03-02T15:45:00',
                          },
                          carrierCode: 'KL',
                          number: '1234',
                          aircraft: {
                            code: '73H',
                          },
                          operating: {
                            carrierCode: 'KL',
                          },
                          duration: 'PT1H15M',
                          id: '41',
                          numberOfStops: 0,
                        },
                        {
                          departure: {
                            iataCode: 'AMS',
                            at: '2020-03-02T17:05:00',
                          },
                          arrival: {
                            iataCode: 'MAD',
                            terminal: '2',
                            at: '2020-03-02T19:35:00',
                          },
                          carrierCode: 'KL',
                          number: '1705',
                          aircraft: {
                            code: '73J',
                          },
                          operating: {
                            carrierCode: 'KL',
                          },
                          duration: 'PT2H30M',
                          id: '42',
                          numberOfStops: 0,
                        },
                      ],
                    },
                    {
                      segments: [
                        {
                          departure: {
                            iataCode: 'MAD',
                            terminal: '2',
                            at: '2020-03-05T20:25:00',
                          },
                          arrival: {
                            iataCode: 'AMS',
                            at: '2020-03-05T23:00:00',
                          },
                          carrierCode: 'KL',
                          number: '1706',
                          aircraft: {
                            code: '73J',
                          },
                          operating: {
                            carrierCode: 'KL',
                          },
                          duration: 'PT2H35M',
                          id: '81',
                          numberOfStops: 0,
                        },
                        {
                          departure: {
                            iataCode: 'AMS',
                            at: '2020-03-06T10:40:00',
                          },
                          arrival: {
                            iataCode: 'GIG',
                            terminal: '2',
                            at: '2020-03-06T18:35:00',
                          },
                          carrierCode: 'KL',
                          number: '705',
                          aircraft: {
                            code: '772',
                          },
                          operating: {
                            carrierCode: 'KL',
                          },
                          duration: 'PT11H55M',
                          id: '82',
                          numberOfStops: 0,
                        },
                      ],
                    },
                  ],
                  price: {
                    currency: 'USD',
                    total: '8514.96',
                    base: '8314.00',
                    fees: [
                      {
                        amount: '0.00',
                        type: 'SUPPLIER',
                      },
                      {
                        amount: '0.00',
                        type: 'TICKETING',
                      },
                      {
                        amount: '0.00',
                        type: 'FORM_OF_PAYMENT',
                      },
                    ],
                    grandTotal: '8514.96',
                    billingCurrency: 'USD',
                  },
                  pricingOptions: {
                    fareType: ['PUBLISHED'],
                    includedCheckedBagsOnly: true,
                  },
                  validatingAirlineCodes: ['AF'],
                  travelerPricings: [
                    {
                      travelerId: '1',
                      fareOption: 'STANDARD',
                      travelerType: 'ADULT',
                      price: {
                        currency: 'USD',
                        total: '4849.48',
                        base: '4749.00',
                        taxes: [
                          {
                            amount: '31.94',
                            code: 'BR',
                          },
                          {
                            amount: '14.68',
                            code: 'CJ',
                          },
                          {
                            amount: '5.28',
                            code: 'FR',
                          },
                          {
                            amount: '17.38',
                            code: 'JD',
                          },
                          {
                            amount: '0.69',
                            code: 'OG',
                          },
                          {
                            amount: '3.95',
                            code: 'QV',
                          },
                          {
                            amount: '12.12',
                            code: 'QX',
                          },
                          {
                            amount: '14.44',
                            code: 'RN',
                          },
                        ],
                      },
                      fareDetailsBySegment: [
                        {
                          segmentId: '40',
                          cabin: 'BUSINESS',
                          fareBasis: 'CFFBR',
                          brandedFare: 'BUSINESS',
                          class: 'C',
                          includedCheckedBags: {
                            quantity: 2,
                          },
                        },
                        {
                          segmentId: '41',
                          cabin: 'BUSINESS',
                          fareBasis: 'CFFBR',
                          brandedFare: 'BUSINESS',
                          class: 'J',
                          includedCheckedBags: {
                            quantity: 2,
                          },
                        },
                        {
                          segmentId: '42',
                          cabin: 'BUSINESS',
                          fareBasis: 'CFFBR',
                          brandedFare: 'BUSINESS',
                          class: 'J',
                          includedCheckedBags: {
                            quantity: 2,
                          },
                        },
                        {
                          segmentId: '81',
                          cabin: 'ECONOMY',
                          fareBasis: 'YFFBR',
                          brandedFare: 'FULLFLEX',
                          class: 'Y',
                          includedCheckedBags: {
                            quantity: 1,
                          },
                        },
                        {
                          segmentId: '82',
                          cabin: 'ECONOMY',
                          fareBasis: 'YFFBR',
                          brandedFare: 'FULLFLEX',
                          class: 'Y',
                          includedCheckedBags: {
                            quantity: 1,
                          },
                        },
                      ],
                    },
                    {
                      travelerId: '2',
                      fareOption: 'STANDARD',
                      travelerType: 'CHILD',
                      price: {
                        currency: 'USD',
                        total: '3665.48',
                        base: '3565.00',
                        taxes: [
                          {
                            amount: '31.94',
                            code: 'BR',
                          },
                          {
                            amount: '14.68',
                            code: 'CJ',
                          },
                          {
                            amount: '5.28',
                            code: 'FR',
                          },
                          {
                            amount: '17.38',
                            code: 'JD',
                          },
                          {
                            amount: '0.69',
                            code: 'OG',
                          },
                          {
                            amount: '3.95',
                            code: 'QV',
                          },
                          {
                            amount: '12.12',
                            code: 'QX',
                          },
                          {
                            amount: '14.44',
                            code: 'RN',
                          },
                        ],
                      },
                      fareDetailsBySegment: [
                        {
                          segmentId: '40',
                          cabin: 'BUSINESS',
                          fareBasis: 'CFFBR',
                          brandedFare: 'BUSINESS',
                          class: 'C',
                          includedCheckedBags: {
                            quantity: 2,
                          },
                        },
                        {
                          segmentId: '41',
                          cabin: 'BUSINESS',
                          fareBasis: 'CFFBR',
                          brandedFare: 'BUSINESS',
                          class: 'J',
                          includedCheckedBags: {
                            quantity: 2,
                          },
                        },
                        {
                          segmentId: '42',
                          cabin: 'BUSINESS',
                          fareBasis: 'CFFBR',
                          brandedFare: 'BUSINESS',
                          class: 'J',
                          includedCheckedBags: {
                            quantity: 2,
                          },
                        },
                        {
                          segmentId: '81',
                          cabin: 'ECONOMY',
                          fareBasis: 'YFFBR',
                          brandedFare: 'FULLFLEX',
                          class: 'Y',
                          includedCheckedBags: {
                            quantity: 1,
                          },
                        },
                        {
                          segmentId: '82',
                          cabin: 'ECONOMY',
                          fareBasis: 'YFFBR',
                          brandedFare: 'FULLFLEX',
                          class: 'Y',
                          includedCheckedBags: {
                            quantity: 1,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
              travelers: [
                {
                  id: '1',
                  dateOfBirth: '1982-01-16',
                  name: {
                    firstName: 'JORGE',
                    lastName: 'GONZALES',
                  },
                  gender: 'MALE',
                  contact: {
                    emailAddress: 'jorge.gonzales833@telefonica.es',
                    phones: [
                      {
                        deviceType: 'MOBILE',
                        countryCallingCode: '34',
                        number: '480080076',
                      },
                    ],
                  },
                  documents: [
                    {
                      documentType: 'PASSPORT',
                      birthPlace: 'Madrid',
                      issuanceLocation: 'Madrid',
                      issuanceDate: '2015-04-14',
                      number: '00000000',
                      expiryDate: '2025-04-14',
                      issuanceCountry: 'ES',
                      validityCountry: 'ES',
                      nationality: 'ES',
                      holder: true,
                    },
                  ],
                },
                {
                  id: '2',
                  dateOfBirth: '2012-10-11',
                  gender: 'FEMALE',
                  contact: {
                    emailAddress: 'jorge.gonzales833@telefonica.es',
                    phones: [
                      {
                        deviceType: 'MOBILE',
                        countryCallingCode: '34',
                        number: '480080076',
                      },
                    ],
                  },
                  name: {
                    firstName: 'ADRIANA',
                    lastName: 'GONZALES',
                  },
                },
              ],
              remarks: {
                general: [
                  {
                    subType: 'GENERAL_MISCELLANEOUS',
                    text: 'ONLINE BOOKING FROM INCREIBLE VIAJES',
                  },
                ],
              },
              ticketingAgreement: {
                option: 'DELAY_TO_CANCEL',
                delay: '6D',
              },
              contacts: [
                {
                  addresseeName: {
                    firstName: 'PABLO',
                    lastName: 'RODRIGUEZ',
                  },
                  companyName: 'INCREIBLE VIAJES',
                  purpose: 'STANDARD',
                  phones: [
                    {
                      deviceType: 'LANDLINE',
                      countryCallingCode: '34',
                      number: '480080071',
                    },
                    {
                      deviceType: 'MOBILE',
                      countryCallingCode: '33',
                      number: '480080072',
                    },
                  ],
                  emailAddress: 'support@increibleviajes.es',
                  address: {
                    lines: ['Calle Prado, 16'],
                    postalCode: '28014',
                    cityName: 'Madrid',
                    countryCode: 'ES',
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

  async retrieveAGivenFlightOrder(id: string) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(`https://test.api.amadeus.com/v1/booking/flight-orders/${id}`, {
          headers: {
            Authorization: 'Bearer ' + dataToken?.access_token,
          },
        })
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

  async getItineraryPriceMetric(
    originIataCode: string,
    destinationIataCode: string,
    departureDate: string,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/analytics/itinerary-price-metrics?originIataCode=${
            originIataCode || 'MAD'
          }&destinationIataCode=${destinationIataCode || 'CDG'}&departureDate=${
            departureDate || '2021-03-21'
          }&currencyCode=EUR&oneWay=false`,
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

  async getTheDelaySegmentWhereTheFlightIsLikelyToLay(
    originLocationCode: string,
    destinationLocationCode: string,
    departureDate: string,
    departureTime: string,
    arrivalDate: string,
    arrivalTime: string,
    aircraftCode: string,
    carrierCode: string,
    flightNumber: string,
    duration: string,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/travel/predictions/flight-delay?originLocationCode=${
            originLocationCode || 'NCE'
          }&destinationLocationCode=${
            destinationLocationCode || 'IST'
          }&departureDate=${departureDate || '2020-08-01'}&departureTime=${
            departureTime || '18%3A20%3A00'
          }&arrivalDate=${arrivalDate || '2020-08-01'}&arrivalTime=${
            arrivalTime || '22%3A15%3A00'
          }&aircraftCode=${aircraftCode || '321'}&carrierCode=${
            carrierCode || 'TK'
          }&flightNumber=${flightNumber || '1816'}&duration=${
            duration || 'PT31H10M'
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
      console.log('abc');
      return err;
    }
  }

  async getAPercentageOfOnTimeFlightDeparturesFromAGivenAirport(
    airportCode: string,
    date: string,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/airport/predictions/on-time?airportCode=${
            airportCode || 'JFK'
          }&date=${date || '2023-11-12'}`,
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

  async predictTheChoiceOfFlightOffers() {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .post(
          `https://test.api.amadeus.com/v2/shopping/flight-offers/prediction`,
          {
            meta: {
              count: 2,
            },
            data: [
              {
                type: 'flight-offer',
                id: '1',
                source: 'GDS',
                instantTicketingRequired: false,
                nonHomogeneous: false,
                oneWay: false,
                lastTicketingDate: '2020-01-16',
                numberOfBookableSeats: 7,
                itineraries: [
                  {
                    duration: 'PT15H55M',
                    segments: [
                      {
                        departure: {
                          iataCode: 'GIG',
                          terminal: '2',
                          at: '2020-08-01T21:50:00',
                        },
                        arrival: {
                          iataCode: 'LHR',
                          terminal: '5',
                          at: '2020-08-02T13:10:00',
                        },
                        carrierCode: 'BA',
                        number: '248',
                        aircraft: {
                          code: '788',
                        },
                        operating: {
                          carrierCode: 'BA',
                        },
                        duration: 'PT11H20M',
                        id: '1',
                        numberOfStops: 0,
                        blacklistedInEU: false,
                      },
                      {
                        departure: {
                          iataCode: 'LHR',
                          terminal: '5',
                          at: '2020-08-02T15:15:00',
                        },
                        arrival: {
                          iataCode: 'MAD',
                          terminal: '4S',
                          at: '2020-08-02T18:45:00',
                        },
                        carrierCode: 'BA',
                        number: '462',
                        aircraft: {
                          code: '321',
                        },
                        operating: {
                          carrierCode: 'BA',
                        },
                        duration: 'PT2H30M',
                        id: '2',
                        numberOfStops: 0,
                        blacklistedInEU: false,
                      },
                    ],
                  },
                  {
                    duration: 'PT13H35M',
                    segments: [
                      {
                        departure: {
                          iataCode: 'MAD',
                          terminal: '4S',
                          at: '2020-08-05T23:55:00',
                        },
                        arrival: {
                          iataCode: 'GRU',
                          terminal: '3',
                          at: '2020-08-06T05:40:00',
                        },
                        carrierCode: 'IB',
                        number: '6827',
                        aircraft: {
                          code: '346',
                        },
                        operating: {
                          carrierCode: 'IB',
                        },
                        duration: 'PT10H45M',
                        id: '5',
                        numberOfStops: 0,
                        blacklistedInEU: false,
                      },
                      {
                        departure: {
                          iataCode: 'GRU',
                          terminal: '2',
                          at: '2020-08-06T07:30:00',
                        },
                        arrival: {
                          iataCode: 'GIG',
                          terminal: '2',
                          at: '2020-08-06T08:30:00',
                        },
                        carrierCode: 'LA',
                        number: '4508',
                        aircraft: {
                          code: '320',
                        },
                        duration: 'PT1H',
                        id: '6',
                        numberOfStops: 0,
                        blacklistedInEU: false,
                      },
                    ],
                  },
                ],
                price: {
                  currency: 'USD',
                  total: '3842.10',
                  base: '3661.00',
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
                  grandTotal: '3842.10',
                },
                pricingOptions: {
                  fareType: ['PUBLISHED'],
                  includedCheckedBagsOnly: false,
                },
                validatingAirlineCodes: ['BA'],
                travelerPricings: [
                  {
                    travelerId: '1',
                    fareOption: 'STANDARD',
                    travelerType: 'ADULT',
                    price: {
                      currency: 'USD',
                      total: '2178.55',
                      base: '2088.00',
                    },
                    fareDetailsBySegment: [
                      {
                        segmentId: '1',
                        cabin: 'BUSINESS',
                        fareBasis: 'RNNZ60S3',
                        brandedFare: 'BUSINESS',
                        class: 'R',
                        includedCheckedBags: {
                          quantity: 2,
                        },
                      },
                      {
                        segmentId: '2',
                        cabin: 'BUSINESS',
                        fareBasis: 'RNNZ60S3',
                        brandedFare: 'BUSINESS',
                        class: 'J',
                        includedCheckedBags: {
                          quantity: 2,
                        },
                      },
                      {
                        segmentId: '5',
                        cabin: 'ECONOMY',
                        fareBasis: 'VDH0NNM3',
                        brandedFare: 'BAGSEAT',
                        class: 'V',
                        includedCheckedBags: {
                          quantity: 1,
                        },
                      },
                      {
                        segmentId: '6',
                        cabin: 'ECONOMY',
                        fareBasis: 'VDH0NNM3',
                        brandedFare: 'BAGSEAT',
                        class: 'V',
                        includedCheckedBags: {
                          quantity: 1,
                        },
                      },
                    ],
                  },
                  {
                    travelerId: '2',
                    fareOption: 'STANDARD',
                    travelerType: 'CHILD',
                    price: {
                      currency: 'USD',
                      total: '1663.55',
                      base: '1573.00',
                    },
                    fareDetailsBySegment: [
                      {
                        segmentId: '1',
                        cabin: 'BUSINESS',
                        fareBasis: 'RNNZ60S3',
                        brandedFare: 'BUSINESS',
                        class: 'R',
                      },
                      {
                        segmentId: '2',
                        cabin: 'BUSINESS',
                        fareBasis: 'RNNZ60S3',
                        brandedFare: 'BUSINESS',
                        class: 'J',
                      },
                      {
                        segmentId: '5',
                        cabin: 'ECONOMY',
                        fareBasis: 'VDH0NNM3',
                        brandedFare: 'BAGSEAT',
                        class: 'V',
                      },
                      {
                        segmentId: '6',
                        cabin: 'ECONOMY',
                        fareBasis: 'VDH0NNM3',
                        brandedFare: 'BAGSEAT',
                        class: 'V',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'flight-offer',
                id: '2',
                source: 'GDS',
                instantTicketingRequired: false,
                nonHomogeneous: false,
                oneWay: false,
                lastTicketingDate: '2020-01-16',
                numberOfBookableSeats: 7,
                itineraries: [
                  {
                    duration: 'PT15H55M',
                    segments: [
                      {
                        departure: {
                          iataCode: 'GIG',
                          terminal: '2',
                          at: '2020-08-01T21:50:00',
                        },
                        arrival: {
                          iataCode: 'LHR',
                          terminal: '5',
                          at: '2020-08-02T13:10:00',
                        },
                        carrierCode: 'BA',
                        number: '248',
                        aircraft: {
                          code: '788',
                        },
                        operating: {
                          carrierCode: 'BA',
                        },
                        duration: 'PT11H20M',
                        id: '1',
                        numberOfStops: 0,
                        blacklistedInEU: false,
                      },
                      {
                        departure: {
                          iataCode: 'LHR',
                          terminal: '5',
                          at: '2020-08-02T15:15:00',
                        },
                        arrival: {
                          iataCode: 'MAD',
                          terminal: '4S',
                          at: '2020-08-02T18:45:00',
                        },
                        carrierCode: 'BA',
                        number: '462',
                        aircraft: {
                          code: '321',
                        },
                        operating: {
                          carrierCode: 'BA',
                        },
                        duration: 'PT2H30M',
                        id: '2',
                        numberOfStops: 0,
                        blacklistedInEU: false,
                      },
                    ],
                  },
                  {
                    duration: 'PT19H5M',
                    segments: [
                      {
                        departure: {
                          iataCode: 'MAD',
                          terminal: '4S',
                          at: '2020-08-05T23:55:00',
                        },
                        arrival: {
                          iataCode: 'GRU',
                          terminal: '3',
                          at: '2020-08-06T05:40:00',
                        },
                        carrierCode: 'IB',
                        number: '6827',
                        aircraft: {
                          code: '346',
                        },
                        operating: {
                          carrierCode: 'IB',
                        },
                        duration: 'PT10H45M',
                        id: '3',
                        numberOfStops: 0,
                        blacklistedInEU: false,
                      },
                      {
                        departure: {
                          iataCode: 'GRU',
                          terminal: '2',
                          at: '2020-08-06T13:00:00',
                        },
                        arrival: {
                          iataCode: 'GIG',
                          terminal: '2',
                          at: '2020-08-06T14:00:00',
                        },
                        carrierCode: 'LA',
                        number: '4537',
                        aircraft: {
                          code: '321',
                        },
                        duration: 'PT1H',
                        id: '4',
                        numberOfStops: 0,
                        blacklistedInEU: false,
                      },
                    ],
                  },
                ],
                price: {
                  currency: 'USD',
                  total: '3842.10',
                  base: '3661.00',
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
                  grandTotal: '3842.10',
                },
                pricingOptions: {
                  fareType: ['PUBLISHED'],
                  includedCheckedBagsOnly: false,
                },
                validatingAirlineCodes: ['BA'],
                travelerPricings: [
                  {
                    travelerId: '1',
                    fareOption: 'STANDARD',
                    travelerType: 'ADULT',
                    price: {
                      currency: 'USD',
                      total: '2178.55',
                      base: '2088.00',
                    },
                    fareDetailsBySegment: [
                      {
                        segmentId: '1',
                        cabin: 'BUSINESS',
                        fareBasis: 'RNNZ60S3',
                        brandedFare: 'BUSINESS',
                        class: 'R',
                        includedCheckedBags: {
                          quantity: 2,
                        },
                      },
                      {
                        segmentId: '2',
                        cabin: 'BUSINESS',
                        fareBasis: 'RNNZ60S3',
                        brandedFare: 'BUSINESS',
                        class: 'J',
                        includedCheckedBags: {
                          quantity: 2,
                        },
                      },
                      {
                        segmentId: '3',
                        cabin: 'ECONOMY',
                        fareBasis: 'VDH0NNM3',
                        brandedFare: 'BAGSEAT',
                        class: 'V',
                        includedCheckedBags: {
                          quantity: 1,
                        },
                      },
                      {
                        segmentId: '4',
                        cabin: 'ECONOMY',
                        fareBasis: 'VDH0NNM3',
                        brandedFare: 'BAGSEAT',
                        class: 'V',
                        includedCheckedBags: {
                          quantity: 1,
                        },
                      },
                    ],
                  },
                  {
                    travelerId: '2',
                    fareOption: 'STANDARD',
                    travelerType: 'CHILD',
                    price: {
                      currency: 'USD',
                      total: '1663.55',
                      base: '1573.00',
                    },
                    fareDetailsBySegment: [
                      {
                        segmentId: '1',
                        cabin: 'BUSINESS',
                        fareBasis: 'RNNZ60S3',
                        brandedFare: 'BUSINESS',
                        class: 'R',
                      },
                      {
                        segmentId: '2',
                        cabin: 'BUSINESS',
                        fareBasis: 'RNNZ60S3',
                        brandedFare: 'BUSINESS',
                        class: 'J',
                      },
                      {
                        segmentId: '3',
                        cabin: 'ECONOMY',
                        fareBasis: 'VDH0NNM3',
                        brandedFare: 'BAGSEAT',
                        class: 'V',
                      },
                      {
                        segmentId: '4',
                        cabin: 'ECONOMY',
                        fareBasis: 'VDH0NNM3',
                        brandedFare: 'BAGSEAT',
                        class: 'V',
                      },
                    ],
                  },
                ],
              },
            ],
            dictionaries: {
              locations: {
                MAD: {
                  cityCode: 'MAD',
                  countryCode: 'ES',
                },
                GIG: {
                  cityCode: 'RIO',
                  countryCode: 'BR',
                },
                LHR: {
                  cityCode: 'LON',
                  countryCode: 'GB',
                },
                GRU: {
                  cityCode: 'SAO',
                  countryCode: 'BR',
                },
              },
              aircraft: {
                '320': 'AIRBUS INDUSTRIE A320-100/200',
                '321': 'AIRBUS INDUSTRIE A321',
                '346': 'AIRBUS INDUSTRIE A340-600',
                '788': 'BOEING 787-8',
              },
              currencies: {
                USD: 'US DOLLAR',
              },
              carriers: {
                LA: 'LATAM AIRLINES GROUP',
                IB: 'IBERIA',
                BA: 'BRITISH AIRWAYS',
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

  async retrievesAUniqueFlightByXSearchCriteria(
    carrierCode: string,
    flightNumber: string,
    scheduledDepartureDate: string,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v2/schedule/flights?carrierCode=${
            carrierCode || 'TP'
          }&flightNumber=${flightNumber || '487'}&scheduledDepartureDate=${
            scheduledDepartureDate || '2023-08-01'
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
      console.log('abc');
      return err;
    }
  }

  async geAListOfAirTrafficReports(originCityCode: string, period: string) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/travel/analytics/air-traffic/traveled?originCityCode=${
            originCityCode || 'MAD'
          }&period=${
            period || '2017-01'
          }&max=10&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score`,
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

  async getAListOfBusiestPeroidReports(
    cityCode: string,
    period: string,
  ): Promise<object> {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/travel/analytics/air-traffic/busiest-period?cityCode=${
            cityCode || 'MAD'
          }&period=${period || '2017'}&direction=ARRIVING`,
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

  async getAListFlightMostBookedDestinations(
    originCityCode: string,
    period: string,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/travel/analytics/air-traffic/booked?originCityCode=${
            originCityCode || 'MAD'
          }&period=${
            period || '2017-08'
          }&max=10&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score`,
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

  async getListCheckinURLs(airlineCode: string) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v2/reference-data/urls/checkin-links?airlineCode=${
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
      console.log('abc');
      return err;
    }
  }

  async getAListOfRelevantAirportsNearToAGivenPoint(
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
          `https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=${
            latitude || 51.57285
          }&longitude=${longitude || -0.4416}&radius=${
            radius || 500
          }&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=relevance`,
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

  async getListOfAirportsAndCitiesMatchingAGivenKeyword(
    subType: string,
    keyword: string,
  ) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/reference-data/locations?subType=${
            subType || 'CITY'
          }&keyword=${
            keyword || 'MUC'
          }&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`,
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

  async getListOfAirportsAndCitiesBaseOnId(id: string) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(`https://test.api.amadeus.com/v1/reference-data/locations/${id}`, {
          headers: {
            Authorization: 'Bearer ' + dataToken?.access_token,
          },
        })
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

  async getAirlinesInformation(airlineCodes: string) {
    try {
      const dataToken = (await this.authService
        .getAccessToken()
        .toPromise()) as any;

      const data = this.httpService
        .get(
          `https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=${airlineCodes}`,
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
