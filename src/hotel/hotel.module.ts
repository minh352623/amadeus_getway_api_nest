import { Module } from '@nestjs/common';
import { HotelEntity } from './hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelService } from './hotel.service';
import { HotelsController } from './hotel.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from 'src/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './schemas/hotel.schema';
import { HotelResolver } from './hotel.resolver';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    // TypeOrmModule.forFeature([HotelEntity]),

    HttpModule,
  ],
  providers: [HotelService, AuthService, HotelResolver],
  controllers: [HotelsController],
})
export class HotelModule {}
