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
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import GraphQLJSON from 'graphql-type-json';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3308,
    //   username: 'root',
    //   password: 'root',
    //   database: 'amadeus',
    //   entities: [HotelEntity],
    //   synchronize: true,
    // }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/amadeus'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: true,

      debug: false,
      resolvers: { JSON: GraphQLJSON },
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
