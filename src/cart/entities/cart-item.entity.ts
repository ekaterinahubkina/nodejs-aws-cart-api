import { Entity, Column, ManyToOne } from 'typeorm';
import { CartEntity } from './cart.entity';

@Entity('cart_items')
export class CartItemEntity {
  @Column('uuid')
  product_id: string;

  @Column({ type: 'integer' })
  count: number;

  @ManyToOne(() => CartEntity, (cart) => cart.cartItems, { nullable: false })
  cart: CartEntity;
}
