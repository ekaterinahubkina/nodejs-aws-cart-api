import { QueryRunner, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartStatuses } from '../models';
import { CartEntity } from '../entities/cart.entity';
import { CartItemEntity } from '../entities/cart-item.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemsResitory: Repository<CartItemEntity>,
  ) {}

  async findByUserId(userId: string): Promise<CartEntity> {
    return await this.cartRepository.findOne({
      where: { status: CartStatuses.OPEN, user: { id: userId } },
      relations: { items: { product: true } },
    });
  }

  async createByUserId(userId: string) {
    const cart = this.cartRepository.create({ status: CartStatuses.OPEN });
    cart.user = new UserEntity({ id: userId });
    const createdCart = await this.cartRepository.save(cart);
    return await this.cartRepository.findOne({
      where: { id: createdCart.id },
      relations: { items: { product: true } },
    });
  }

  async findOrCreateByUserId(userId: string): Promise<CartEntity> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(
    userId: string,
    newCartItem: Partial<CartItemEntity>,
  ): Promise<CartEntity> {
    const cart = await this.findOrCreateByUserId(userId);

    switch (newCartItem.count) {
      case 1:
        const newItem = new CartItemEntity(newCartItem);
        const product = new ProductEntity(newCartItem.product);
        newItem.product = product;
        newItem.cart = cart;
        await this.cartItemsResitory.save(newItem);
        break;

      case 0:
        await this.cartItemsResitory.delete({
          product: { id: newCartItem.product.id },
        });
        break;

      default:
        const itemToUpdate = await this.cartItemsResitory.findOne({
          where: { product: { id: newCartItem.product.id } },
        });

        await this.cartItemsResitory.update(
          { id: itemToUpdate.id },
          {
            count: newCartItem.count,
          },
        );
        break;
    }

    return await this.cartRepository.findOne({
      where: { id: cart.id },
      relations: { items: { product: true } },
    });
  }

  async removeByUserId(userId: string) {
    const userCart = await this.cartRepository.findOne({
      where: { status: CartStatuses.OPEN, user: { id: userId } },
    });

    if (!userCart) {
      throw new NotFoundException('User cart not found');
    }

    return await this.cartRepository.remove(userCart);
  }

  async updateUserCartStatus(
    queryRunner: QueryRunner,
    userId: string,
    status: CartStatuses,
  ): Promise<void> {
    const userCart = await this.cartRepository.findOne({
      where: { status: CartStatuses.OPEN, user: { id: userId } },
    });

    if (!userCart) {
      throw new NotFoundException('User cart not found');
    }

    userCart.status = status;
    await queryRunner.manager.getRepository(CartEntity).save(userCart);
  }
}
