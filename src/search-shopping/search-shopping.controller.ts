import { Controller, Get, Query, Post } from '@nestjs/common';
import { SearchShoppingService } from './search-shopping.service';

@Controller('search-shopping')
export class SearchShoppingController {
  constructor(private readonly searchShoppingService: SearchShoppingService) {}
  /**
   * Airport Routes
   * The Amadeus Airport Routes API helps you find all destinations served by a given airport. Provide the IATA code of a departure airport and the API will retrieve a list of all nonstop destination cities along with their names and IATA codes.
   */
  @Get('get-airport-direct-routes')
  getAirportDirectRoutes(
    @Query('departureAirportCode') departureAirportCode: string,
  ) {
    try {
      return this.searchShoppingService.getAirportDirectRoutes(
        departureAirportCode,
      );
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Airline Routes
   *The Amadeus Airline Routes API helps you find all destinations served by a given airline. Provide the IATA code of an airline and the API will retrieve a list of all destination cities along with their names and IATA codes.
   */

  @Get('get-airline-destinations')
  getAirlineDestinations(@Query('airlineCode') airlineCode: string) {
    try {
      return this.searchShoppingService.getAirlineDestinations(airlineCode);
    } catch (e) {
      console.log(e);
    }
  }

  //Flight Offers Search
  // method post not work
  @Get('get-list-flight-offers-criteria')
  getListFlightOffersCriteria(
    @Query('originLocationCode') originLocationCode: string,
    @Query('destinationLocationCode') destinationLocationCode: string,
    @Query('departureDate') departureDate: string,
    @Query('adults') adults: number,
  ) {
    try {
      return this.searchShoppingService.getListFlightOffersCriteria(
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults,
      );
    } catch (e) {
      //   return res.status(400).json('abc');

      console.log(e.code);
    }
  }

  @Post('get-list-flight-offers-criteria-post')
  getListFlightOffersCriteriaPost() {
    try {
      return this.searchShoppingService.getListFlightOffersCriteriaPost();
    } catch (e) {
      //   return res.status(400).json('abc');

      console.log(e.code);
    }
  }

  //Flight Offers Price
  //Confirm pricing of given flightOffers
  //docs error xem lai
  @Post('confirm-pricing-of-given-flightOffers')
  confirmPricingOfGivenFlightOffers() {
    try {
      console.log('asdsa');

      return this.searchShoppingService.confirmPricingOfGivenFlightOffers();
    } catch (e) {
      //   return res.status(400).json('abc');

      console.log(e.code);
    }
  }

  //Flight Inspiration Search
  @Get('find-the-cheapest-destinations-from-location-of-you')
  findTheCheapestDestinationsFromLocationOfYou(
    @Query('origin') origin: string,
  ) {
    try {
      return this.searchShoppingService.findTheCheapestDestinationsFromLocationOfYou(
        origin,
      );
    } catch (e) {
      console.log(e);
    }
  }

  //Flight Cheapest Date Search
  @Get('find-the-cheapest-flight-dates-from-an-origin-to-a-destination')
  findTheCheapestFlightDatesFromAnOriginToADestination(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
  ) {
    try {
      return this.searchShoppingService.findTheCheapestFlightDatesFromAnOriginToADestination(
        origin,
        destination,
      );
    } catch (e) {
      console.log(e);
    }
  }

  //Flight Availabilities Search
  @Post('list-of-Flight-Availabilities-base-on-searching-criteria')
  getListOfFlightAvailabilitiesBaseOnSearchingCriteria() {
    try {
      return this.searchShoppingService.getListOfFlightAvailabilitiesBaseOnSearchingCriteria();
    } catch (error) {
      console.log(error);
    }
  }

  // /Branded Fares Upsell
  //Return a list of upsell Flight Offers based on given Flight Offers
  //faild docs
  @Post('list-of-upsell-Flight-Offers-based-on-given-Flight-Offers')
  getListOfUpsellFlightOffersBasedOnGivenFlightOffers() {
    try {
      return this.searchShoppingService.getListOfUpsellFlightOffersBasedOnGivenFlightOffers();
    } catch (error) {
      console.log(error);
    }
  }

  //Seatrmap Display

  //Returns all the seat maps of a given order.
  @Get('get-all-the-seat-maps-of-a-given-order')
  getAllTheSeatMapsOfAGivenOrder() {
    try {
      return this.searchShoppingService.getAllTheSeatMapsOfAGivenOrder();
    } catch (error) {
      console.log(error);
    }
  }

  //Returns all the seat maps of a given flightOffer.
  @Post('get-all-the-seat-maps-of-a-given-flightOffer')
  getAllTheSeatMapsOfAGivenFlightOffer() {
    try {
      return this.searchShoppingService.getAllTheSeatMapsOfAGivenFlightOffer();
    } catch (e) {
      console.log(e);
    }
  }
}
