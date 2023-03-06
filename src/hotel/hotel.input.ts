import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class HotelSave {
  @Field()
  name: String;
}
