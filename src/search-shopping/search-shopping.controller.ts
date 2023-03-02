import { Controller, Get, Query, Post, Param } from '@nestjs/common';
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

  //Booking

  //Flight Create Orders
  //do chinh sách của api => status code 400
  @Post('create-order-associated-to-the-flight-offers')
  createOrderAssociatedToTheFlightOffers() {
    try {
      return this.searchShoppingService.createOrderAssociatedToTheFlightOffers();
    } catch (e) {
      console.log(e);
    }
  }

  //Retrieve a given flight order
  //code 404
  @Get('retrieve-a-given-flight-order/:id')
  retrieveAGivenFlightOrder(@Param('id') id: string) {
    try {
      return this.searchShoppingService.retrieveAGivenFlightOrder(id);
    } catch (err) {
      console.log(err);
    }
  }

  //Flight Price Analysis

  //Flight Price Analysis

  @Get('get-itinerary-price-metric')
  getItineraryPriceMetric(
    @Query('originIataCode') originIataCode: string,
    @Query('destinationIataCode') destinationIataCode: string,
    @Query('departureDate') departureDate: string,
  ) {
    try {
      return this.searchShoppingService.getItineraryPriceMetric(
        originIataCode,
        destinationIataCode,
        departureDate,
      );
    } catch (err) {
      console.log(err);
    }
  }

  //flight-delay-prediction
  //Return the delay segment where the flight is likely to lay.
  @Get('get-the-delay-segment-where-the-flight-is-likely-to-lay')
  getTheDelaySegmentWhereTheFlightIsLikelyToLay(
    @Query('originLocationCode') originLocationCode: string,
    @Query('destinationLocationCode') destinationLocationCode: string,
    @Query('departureDate') departureDate: string,
    @Query('departureTime') departureTime: string,
    @Query('arrivalDate') arrivalDate: string,
    @Query('arrivalTime') arrivalTime: string,
    @Query('aircraftCode') aircraftCode: string,
    @Query('carrierCode') carrierCode: string,
    @Query('flightNumber') flightNumber: string,
    @Query('duration') duration: string,
  ) {
    try {
      return this.searchShoppingService.getTheDelaySegmentWhereTheFlightIsLikelyToLay(
        originLocationCode,
        destinationLocationCode,
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
        aircraftCode,
        carrierCode,
        flightNumber,
        duration,
      );
    } catch (err) {
      console.log(err);
    }
  }

  //Airport On-Time Performance
  @Get('get-a-percentage-of-on-time-flight-departures-from-a-given-airport')
  getAPercentageOfOnTimeFlightDeparturesFromAGivenAirport(
    @Query('airportCode') airportCode: string,
    @Query('date') date: string,
  ) {
    try {
      return this.searchShoppingService.getAPercentageOfOnTimeFlightDeparturesFromAGivenAirport(
        airportCode,
        date,
      ); //
    } catch (err) {
      console.log(err);
    }
  }

  //Flight Choice Prediction
  @Post('predict-the-choice-of-flight-offers')
  predictTheChoiceOfFlightOffers() {
    try {
      return this.searchShoppingService.predictTheChoiceOfFlightOffers(); //
    } catch (err) {
      console.log(err);
    }
  }

  //Schedule

  //On Demand Flight Status
  //Retrieves a unique flight by search criteria
  @Get('retrieves-a-unique-flight-by-search-criteria')
  retrievesAUniqueFlightByXSearchCriteria(
    @Query('carrierCode') carrierCode: string,
    @Query('flightNumber') flightNumber: string,
    @Query('scheduledDepartureDate ') scheduledDepartureDate: string,
  ) {
    try {
      return this.searchShoppingService.retrievesAUniqueFlightByXSearchCriteria(
        carrierCode,
        flightNumber,
        scheduledDepartureDate,
      ); //
    } catch (err) {
      console.log(err);
    }
  }

  //Flight Most Traveled Destinations
  //Returns a list of air traffic reports.
  @Get('get-a-list-of-air-traffic-reports')
  geAListOfAirTrafficReports(
    @Query('originCityCode') originCityCode: string,
    @Query('period') period: string,
  ) {
    try {
      return this.searchShoppingService.geAListOfAirTrafficReports(
        originCityCode,
        period,
      ); //
    } catch (err) {
      console.log(err);
    }
  }

  //Flight Busiest Traveling Period

  @Get('get-a-list-of-busiest-peroid-reports')
  getAListOfBusiestPeroidReports(
    @Query('cityCode') cityCode: string,
    @Query('period') period: string,
  ): Promise<object> {
    try {
      return this.searchShoppingService.getAListOfBusiestPeroidReports(
        cityCode,
        period,
      ); //
    } catch (err) {
      console.log(err);
    }
  }

  //Flight Most Booked Destinations
  @Get('get-a-list-flight-most-booked-destinations')
  getAListFlightMostBookedDestinations(
    @Query('originCityCode') originCityCode: string,
    @Query('period') period: string,
  ) {
    try {
      return this.searchShoppingService.getAListFlightMostBookedDestinations(
        originCityCode,
        period,
      ); //
    } catch (err) {
      console.log(err);
    }
  }

  //Utilities
  //Flight Check-in Links

  //Lists Check-in URLs
  @Get('get-list-checkin-urls')
  getListCheckinURLs(@Query('airlineCode') airlineCode: string) {
    try {
      return this.searchShoppingService.getListCheckinURLs(airlineCode);
    } catch (e) {
      console.log(e);
    }
  }

  //Airport Nearest Relevant
  ///reference-data/locations/airports
  @Get('get-a-list-of-relevant-airports-near-to-a-given-point')
  async getAListOfRelevantAirportsNearToAGivenPoint(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number,
  ) {
    try {
      const data =
        await this.searchShoppingService.getAListOfRelevantAirportsNearToAGivenPoint(
          latitude,
          longitude,
          radius,
        );
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  //Airport & City Search
  //Returns a list of airports and cities matching a given keyword.
  @Get('get-list-of-airports-and-cities-matching-a-given-keyword')
  getListOfAirportsAndCitiesMatchingAGivenKeyword(
    @Query('subType') subType: string,
    @Query('keyword') keyword: string,
  ) {
    try {
      return this.searchShoppingService.getListOfAirportsAndCitiesMatchingAGivenKeyword(
        subType,
        keyword,
      );
    } catch (e) {
      console.log('ad');

      console.log(e);
    }
  }

  //Returns a specific airports or cities based on its id.
  @Get('get-list-of-airports-and-cities-baseon-id/:id')
  getListOfAirportsAndCitiesBaseOnId(@Param('id') id: string) {
    try {
      return this.searchShoppingService.getListOfAirportsAndCitiesBaseOnId(id);
    } catch (e) {
      console.log(e);
    }
  }

  //Airline Code Lookup
  //Return airlines information
  @Get('get-airlines-information')
  getAirlinesInformation(@Query('airlineCodes') airlineCodes: string) {
    try {
      if (!airlineCodes) return 'query airlineCodes not found';
      return this.searchShoppingService.getAirlinesInformation(airlineCodes);
    } catch (e) {
      console.log(e);
    }
  }
}
