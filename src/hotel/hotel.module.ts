import { Module } from '@nestjs/common';
import { HotelEntity } from './hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelService } from './hotel.service';
import { HotelsController } from './hotel.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([HotelEntity]), HttpModule],
  providers: [HotelService],
  controllers: [HotelsController],
})
export class HotelModule {}
