import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from 'src/users/entities/user.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { CartItemEntity } from 'src/cart/entities/cart-item.entity';
import { OrderEntity } from 'src/order/entities/order.entity';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [UserEntity, CartEntity, CartItemEntity, OrderEntity],
  synchronize: true,
  migrationsRun: false,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
};

const dataSource: DataSource = new DataSource(dataSourceOptions);
export default dataSource;
