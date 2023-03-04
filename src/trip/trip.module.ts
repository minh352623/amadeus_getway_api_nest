import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';

@Module({
  imports: [HttpModule],

  controllers: [TripController],
  providers: [TripService, AuthService],
})
export class TripModule {}
