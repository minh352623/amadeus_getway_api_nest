import { Controller, Get, Post, Query } from '@nestjs/common';
import { TripService } from './trip.service';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  //Utilities
  //city search
  //GET Cities by keyword

  @Get('get-cities-by-keyword')
  getCitiesByKeyword(
    @Query('countryCode') countryCode: string,
    @Query('keyword') keyword: string,
    @Query('max') max: number,
  ) {
    try {
      if (!keyword) {
        return {
          status: 400,
          message: 'keyword not null',
        };
      }
      return this.tripService.getCitiesByKeyword(countryCode, keyword, max);
    } catch (e) {
      console.log(e);
    }
  }

  //POST Trip Parser request
  @Post('trip-parser-request')
  tripParserRequest() {
    try {
      return this.tripService.tripParserRequest();
    } catch (e) {
      console.log(e);
    }
  }

  //Trip Purpose Prediction
  ///Returns the forecast purpose of a trip
  @Get('get-the-forecast-purpose-of-a-trip')
  getTheForecastPurposeOfATrip(
    @Query('originLocationCode') originLocationCode: string,
    @Query('destinationLocationCode') destinationLocationCode: string,
    @Query('departureDate') departureDate: string,
    @Query('returnDate') returnDate: string,
    @Query('searchDate') searchDate: string,
  ) {
    try {
      if (
        !originLocationCode ||
        !destinationLocationCode ||
        !departureDate ||
        !returnDate
      ) {
        return {
          status: 400,
          message:
            'originLocationCode and destinationLocationCode and departureDate and returnDate not null',
        };
      }
      return this.tripService.getTheForecastPurposeOfATrip(
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        searchDate,
      );
    } catch (e) {
      console.log(e);
    }
  }

  //Travel Recommendations
  //GET recommended destinations

  @Get('get-recommended-destinations')
  getRecommendedDestinations(
    @Query('cityCodes') cityCodes: string,
    @Query('travelerCountryCode') travelerCountryCode: string,
  ) {
    try {
      if (!cityCodes) {
        return {
          status: 400,
          message: 'cityCodes not null',
        };
      }
      return this.tripService.getRecommendedDestinations(
        cityCodes,
        travelerCountryCode,
      );
    } catch (e) {
      console.log(e);
    }
  }
}
