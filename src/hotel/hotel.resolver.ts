import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HotelService } from './hotel.service';
import { HotelType } from './hotel.type';

@Resolver((of) => HotelType)
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Query((returns) => HotelType)
  hotel(@Args({ name: 'id', type: () => [String] }) id: string[]) {
    return this.hotelService.getHotel(id);
  }

  @Query((returns) => [HotelType])
  hotels(@Args('keyword') keyword: string) {
    return this.hotelService.getHotels(keyword);
  }

  @Mutation((returns) => HotelType)
  async createHotel(@Args('name') name: string) {
    return this.hotelService.saveHotel({ name: name });
  }
}
