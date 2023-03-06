import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import GraphQLJSON from 'graphql-type-json';

@ObjectType('hotel')
export class HotelType {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  chainCode: string;

  @Field(() => String)
  iataCode: JSON;

  @Field(() => GraphQLJSON)
  geoCode: String;

  @Field(() => String)
  name: string;

  @Field(() => GraphQLJSON)
  distance: JSON;

  @Field(() => String)
  dupeId: string;

  @Field(() => String)
  hotelId: string;

  @Field(() => Date)
  lastUpdate: Date;
}
