import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatuses } from '../models';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async findById(orderId: string): Promise<OrderEntity> {
    return await this.orderRepository.findOneBy({ id: orderId });
  }

  async create(data: CreateOrderDto) {
    const { cartId, userId, total, address, comments, payment } = data;

    const order = new OrderEntity({ status: OrderStatuses.IN_PROGRESS });

    order.cart = new CartEntity({ id: cartId });
    order.user = new UserEntity({ id: userId });
    order.total = total;
    order.comments = comments;
    order.delivery = JSON.stringify(address);
    order.payment = JSON.stringify(payment);

    return await this.orderRepository.save(order);
  }

  async update(orderId: string, data: Partial<CreateOrderDto>) {
    const order = await this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    const { cartId, userId, total, status, address, comments, payment } = data;

    if (cartId) {
      order.cart = new CartEntity({ id: cartId });
    }

    if (userId) {
      order.user = new UserEntity({ id: userId });
    }

    order.total = total;
    order.status = status;
    order.delivery = address;
    order.comments = comments;
    order.delivery = JSON.stringify(address);
    order.payment = JSON.stringify(payment);

    return await this.orderRepository.save(order);
  }
}
