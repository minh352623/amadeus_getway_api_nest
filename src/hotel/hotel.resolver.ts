import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HotelService } from './hotel.service';
import { HotelType } from './hotel.type';

@Resolver((of) => HotelType)
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Query((returns) => HotelType)
  hotel() {
    return {
      _id: '6405968d7de2dfab5e635963',
      chainCode: 'HS',
      iataCode: 'XVL',
      geoCode: {
        latitude: '10.32341',
        longitude: '106.01731',
      },
      name: 'MEKONGRIVERSIDE BOUTIQUERESORT-SPA',
      distance: {
        value: '42.69',
        unit: 'KM',
      },
      dupeId: '700889504',
      hotelId: 'HSXVLAAB',
      lastUpdate: {
        $date: {
          $numberLong: '1669676631000',
        },
      },
      createdAt: {
        $date: {
          $numberLong: '1678087821594',
        },
      },
      updatedAt: {
        $date: {
          $numberLong: '1678087821594',
        },
      },
    };
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
