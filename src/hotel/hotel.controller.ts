import { Controller, Get, Param, Query, Post } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelService: HotelService) {}

  //Search Hotels using its unique Id
  @Get('get-hotels-using-its-unique-id')
  getHotelsUsingItsUniqueId(@Query('hotelIds') hotelIds: string[]) {
    try {
      if (!hotelIds)
        return {
          status: 400,
          message: 'hotelIds not null',
        };
      return this.hotelService.getHotelsUsingItsUniqueId(hotelIds);
    } catch (e) {
      console.log(e);
    }
  }

  // /Search Hotels in a city

  @Get('get-hotels-in-a-city')
  getHotelsInACity(
    @Query('cityCode') cityCode: string,
    @Query('radius') radius: number,
    @Query('radiusUnit') radiusUnit: string,
  ) {
    try {
      if (!cityCode)
        return {
          status: 400,
          message: 'cityCode not null',
        };
      return this.hotelService.getHotelsInACity(cityCode, radius, radiusUnit);
    } catch (e) {
      console.log(e);
    }
  }

  //Search Hotels using Geocode
  @Get('get-hotels-in-a-geocode')
  getHotelsInGeocode(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number,
    @Query('radiusUnit') radiusUnit: string,
  ) {
    try {
      if (!latitude || !longitude)
        return {
          status: 400,
          message: 'latitude and longitude not null',
        };
      return this.hotelService.getHotelsInGeocode(
        latitude,
        longitude,
        radius,
        radiusUnit,
      );
    } catch (e) {
      console.log(e);
    }
  }

  //getMultiHotelOffers
  @Get('get-multi-hotel-offers')
  getMultiHotelOffers(
    @Query('hotelIds') hotelIds: string[],
    @Query('adults') adults: number = 1,
    @Query('checkInDate') checkInDate: string = '2023-11-22',
    @Query('checkOutDate') checkOutDate: string,
    @Query('countryOfResidence') countryOfResidence: string,
    @Query('roomQuantity') roomQuantity: number,
    @Query('priceRange') priceRange: string,
    @Query('currency') currency: string,
  ) {
    try {
      if (!hotelIds)
        return {
          status: 400,
          message: 'hotelIds and longitude not null',
        };
      return this.hotelService.getMultiHotelOffers(
        hotelIds,
        adults,
        checkInDate,
        checkOutDate,
        countryOfResidence,
        roomQuantity,
        priceRange,
        currency,
      );
    } catch (e) {
      console.log(e);
    }
  }

  //getOfferPricing
  @Get('get-offer-pricing-by-offerId/:offerId')
  getOfferPricing(@Param('offerId') offerId: string) {
    try {
      if (!offerId)
        return {
          status: 400,
          message: 'offerId and longitude not null',
        };
      return this.hotelService.getOfferPricing(offerId);
    } catch (e) {
      console.log(e);
    }
  }

  //booking
  //Hotel Booking
  @Post('hotel-booking')
  hotelBooking() {
    try {
      return this.hotelService.hotelBooking();
    } catch (e) {
      console.log(e);
    }
  }

  //travel insights
  //hotel rating
  //Get sentiments by Amadeus Hotel Ids
  @Get('get-sentiments-by-amadeus-hotel-ids')
  getSentimentsByAmadeusHotelIds(@Query('hotelIds') hotelIds: string[]) {
    try {
      if (!hotelIds)
        return {
          status: 400,
          message: 'hotelIds not null',
        };
      return this.hotelService.getSentimentsByAmadeusHotelIds(hotelIds);
    } catch (e) {
      console.log(e);
    }
  }
  //Hotel Name Autocomplete
  //Returns a list of hotels matching a given keyword
  @Get('get-a-list-of-hotels-matching-a-given-keyword')
  getAListOfHotelsMatchingAGivenKeyword(
    @Query('keyword') keyword: string,
    @Query('subType') subType: string[],
    @Query('countryCode') countryCode: string,
  ) {
    try {
      if (!keyword || !subType)
        return {
          status: 400,
          message: 'keyword and subType  not null',
        };
      return this.hotelService.getAListOfHotelsMatchingAGivenKeyword(
        keyword,
        subType,
        countryCode,
      );
    } catch (e) {
      console.log(e);
    }
  }
}
