import { Controller, Get, Param, Query } from '@nestjs/common';
import { DestinationContentService } from './destination-content.service';

@Controller('destination-content')
export class DestinationContentController {
  constructor(
    private readonly destinationContentService: DestinationContentService,
  ) {}

  //location
  //Points Of Interest
  //Returns points of interest for a given location and radius.
  @Get('get-points-of-interest-for-a-given-location-andradius')
  getPointsOfInterestForAGivenLocationAndradius(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number,
  ) {
    try {
      if (!latitude || !longitude)
        return {
          status: 400,
          message: 'latitude and longitude not null',
        };
      return this.destinationContentService.getPointsOfInterestForAGivenLocationAndradius(
        latitude,
        longitude,
        radius,
      );
    } catch (e) {
      console.log(e);
    }
  }

  //Returns points of interest for a given area
  @Get('get-points-of-interest-for-a-given-area')
  getPointsOfInterestForAGivenArea(
    @Query('north') north: number,
    @Query('west') west: number,
    @Query('south') south: number,
    @Query('east') east: number,
  ) {
    try {
      if (!north || !west || !south || !east) {
        return {
          status: 400,
          message: 'north and west and south and east not null',
        };
      }
      return this.destinationContentService.getPointsOfInterestForAGivenArea(
        north,
        west,
        south,
        east,
      );
    } catch (e) {
      console.log(e);
    }
  }

  //Retieve one point of interest by its Id
  @Get('get-one-point-of-interest-by-its-id/:poisId')
  getOnePointOfInterestByItsId(@Param('poisId') poisId: string) {
    try {
      console.log('asd');

      if (!poisId) {
        return {
          status: 400,
          message: 'poisId not null',
        };
      }
      return this.destinationContentService.getOnePointOfInterestByItsId(
        poisId,
      );
    } catch (e) {
      console.log(e);
    }
  }

  //Returns Activities around a given location
  //king dodojww, vĩ độ
  @Get('get-activities-around-a-given-location')
  getActivitiesAroundAGivenLocation(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number,
  ) {
    try {
      if (!latitude || !longitude) {
        return {
          status: 400,
          message: 'latitude and longitude  not null',
        };
      }
      return this.destinationContentService.getActivitiesAroundAGivenLocation(
        latitude,
        longitude,
        radius,
      );
    } catch (e) {
      console.log(e);
    }
  }

  //Returns Activities around a given location
  //dong tay nam bac
  @Get('get-activities-around-a-given-location-4-derection')
  getActivitiesAroundAGivenLocation4Directions(
    @Query('north') north: number,
    @Query('west') west: number,
    @Query('south') south: number,
    @Query('east') east: number,
  ) {
    try {
      if (!north || !west || !south || !east) {
        return {
          status: 400,
          message: 'north and west and south and east  not null',
        };
      }
      return this.destinationContentService.getActivitiesAroundAGivenLocation4Directions(
        north,
        west,
        south,
        east,
      );
    } catch (e) {
      console.log(e);
    }
  }

  //Retrieve one activity by its id
  @Get('get-one-activity-by-its-id/:activityId')
  getOneActivityByItsId(@Param('activityId') activityId: string) {
    try {
      if (!activityId) {
        return {
          status: 400,
          message: 'activityId not null',
        };
      }
      return this.destinationContentService.getOneActivityByItsId(activityId);
    } catch (e) {
      console.log(e);
    }
  }

  //travel insight
  //Location Score
  @Get('get-category-rated-areas')
  getCategoryRatedAreas(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    try {
      if (!latitude || !longitude) {
        return {
          status: 400,
          message: 'latitude and longitude  not null',
        };
      }
      return this.destinationContentService.getCategoryRatedAreas(
        latitude,
        longitude,
      );
    } catch (e) {
      console.log(e);
    }
  }
}
