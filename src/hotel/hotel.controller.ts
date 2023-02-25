import { Controller, Get } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelService: HotelService) {}
  @Get()
  getListHotelGatewayAPi() {
    try {
      return this.hotelService.getHotels();
    } catch (e) {
      console.log(e);
    }
  }
}
