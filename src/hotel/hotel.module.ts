import { Module } from '@nestjs/common';
import { HotelEntity } from './hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelService } from './hotel.service';
import { HotelsController } from './hotel.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelEntity]), HttpModule],
  providers: [HotelService, AuthService],
  controllers: [HotelsController],
})
export class HotelModule {}
