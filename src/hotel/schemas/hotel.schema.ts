import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
export type HotelDocument = HydratedDocument<Hotel>;

@Schema({ timestamps: true })
export class Hotel {
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  chainCode: string;

  @Prop()
  iataCode: string;

  @Prop(
    raw({
      latitude: { type: String },
      longitude: { type: String },
    }),
  )
  geoCode: Record<any, String>;

  @Prop()
  name: string;

  @Prop(
    raw({
      value: { type: String },
      unit: { type: String },
    }),
  )
  distance: Record<any, String>;

  @Prop()
  dupeId: string;

  @Prop()
  hotelId: string;

  @Prop()
  lastUpdate: Date;

  // @Prop()
  // @Field(() => Date, { description: 'Created At' })
  // createdAt?: Date;

  // @Prop()
  // @Field(() => Date, { description: 'Updated At' })
  // updatedAt?: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
