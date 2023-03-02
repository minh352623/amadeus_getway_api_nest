import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HotelEntity } from './hotel/hotel.entity';
import { HotelModule } from './hotel/hotel.module';
import { Covid19Module } from './covid-19/covid-19.module';
import { SearchShoppingModule } from './search-shopping/search-shopping.module';
import { DestinationContentModule } from './destination-content/destination-content.module';
import { TripModule } from './trip/trip.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'root',
      database: 'amadeus',
      entities: [HotelEntity],
      synchronize: true,
    }),
    HotelModule,
    AuthModule,
    Covid19Module,
    SearchShoppingModule,
    DestinationContentModule,
    TripModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
