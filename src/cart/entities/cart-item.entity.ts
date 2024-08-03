import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CartEntity } from './cart.entity';
import { ProductEntity } from './product.entity';

@Entity('cart_items')
export class CartItemEntity {
  constructor(partialEntity: Partial<CartItemEntity>) {
    Object.assign(this, partialEntity);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer' })
  count: number;

  @ManyToOne(() => CartEntity, (cart) => cart.items, { nullable: false })
  cart: CartEntity;

  @ManyToOne(() => ProductEntity, (product) => product.cartItem, {
    nullable: false,
    cascade: ['insert', 'update'],
  })
  product: ProductEntity;
}
