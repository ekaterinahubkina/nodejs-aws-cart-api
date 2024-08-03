import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { OrderStatuses } from '../models';

export class CreateOrderDto {
  constructor(partialDto: Partial<CreateOrderDto>) {
    Object.assign(this, partialDto);
  }
  @IsNotEmpty()
  cartId: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  items: { productId: string; count: number }[];

  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  comments: string;

  @IsOptional()
  payment: string;

  @IsOptional()
  @IsEnum(OrderStatuses)
  status: OrderStatuses;
}
