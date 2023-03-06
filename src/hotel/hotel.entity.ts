import { BaseEntity } from 'src/common/mysql/base.entity';
import { Column, Entity } from 'typeorm';
@Entity({
  name: 'hotel',
})
export class HotelEntity extends BaseEntity {
  @Column({
    length: 50,
  })
  name: string;

  @Column()
  dupeId: string;

  @Column()
  hotelId: string;
}
