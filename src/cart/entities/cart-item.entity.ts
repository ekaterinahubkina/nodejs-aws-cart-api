import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
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

  @OneToOne(() => ProductEntity, (product) => product.cartItem, {
    cascade: ['insert', 'remove'],
    nullable: false,
  })
  @JoinColumn()
  product: ProductEntity;
}
