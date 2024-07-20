import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { OrderStatuses } from '../models';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.orders, { nullable: false })
  user: UserEntity;

  @OneToOne(() => CartEntity, (cart) => cart.order, {
    nullable: false,
  })
  @JoinColumn()
  cart: CartEntity;

  @Column({ type: 'json' })
  payment: string;

  @Column({ type: 'json' })
  delivery: string;

  @Column({ type: 'varchar', nullable: true })
  comments: string;

  @Column({
    type: 'enum',
    enum: OrderStatuses,
  })
  status: OrderStatuses;

  @Column({ type: 'integer' })
  total: number;
}
