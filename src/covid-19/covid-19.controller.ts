import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { Covid19Service } from './covid-19.service';

@Controller('covid-19')
export class Covid19Controller {
  private loggerService: Logger;
  constructor(private readonly covid19Service: Covid19Service) {
    this.loggerService = new Logger();
  }

  @Get()
  getCovid19Report() {
    try {
      return this.covid19Service.getCovid19Report();
    } catch (err) {
      this.loggerService.error(err);
    }
  }

  //Safe Place
  @Get('allSafaty')
  getAllLocationSafety(
    @Query('latitude') latitude: any,
    @Query('longitude') longitude: any,
  ) {
    try {
      return this.covid19Service.getAllLocationSafety(latitude, longitude);
    } catch (err) {
      this.loggerService.error(err);
    }
  }

  @Get('retingLocationSafaty')
  getRatingLocationSafaty(
    @Query('north') north: any,
    @Query('west') west: any,
    @Query('south') south: any,
    @Query('east') east: any,
  ) {
    try {
      return this.covid19Service.getRatingLocationSafaty(
        north,
        west,
        south,
        east,
      );
    } catch (err) {
      this.loggerService.error(err);
    }
  }

  @Get('getInfoLocationById/:id')
  getInfoLOcationById(@Param('id') id: string) {
    try {
      return this.covid19Service.getInfoLOcationById(id);
    } catch (err) {
      this.loggerService.error(err);
    }
  }
}
