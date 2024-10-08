import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  UseGuards,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { calculateCartTotal } from './models-rules';
import { CartService } from './services';
import { BasicAuthGuard } from 'src/auth/guards';
import { UpdateCartDto } from './dtos/updateCart.dto';
import { CreateOrderDto } from 'src/order/dtos/create-order.dto';
import { DataSource } from 'typeorm';
import { CartStatuses } from './models';
import { OrderEntity } from 'src/order/entities/order.entity';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private dataSource: DataSource,
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const cart = await this.cartService.findOrCreateByUserId(
      getUserIdFromRequest(req),
    );

    return {
      cart,
      total: calculateCartTotal(cart),
    };
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body: UpdateCartDto) {
    const cart = await this.cartService.updateByUserId(
      getUserIdFromRequest(req),
      body,
    );

    return {
      cart,
      total: calculateCartTotal(cart),
    };
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    return await this.cartService.removeByUserId(getUserIdFromRequest(req));
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(@Req() req: AppRequest, @Body() body) {
    const userId = getUserIdFromRequest(req);
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length)) {
      throw new BadRequestException();
    }

    const { id: cartId, items } = cart;
    const total = calculateCartTotal(cart);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let order: OrderEntity;

    try {
      order = await this.orderService.create(
        queryRunner,
        new CreateOrderDto({
          ...body,
          userId,
          cartId,
          total,
        }),
      );
      await this.cartService.updateUserCartStatus(
        queryRunner,
        userId,
        CartStatuses.ORDERED,
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return {
      data: { order },
    };
  }
}
