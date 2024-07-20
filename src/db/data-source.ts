import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserEntity } from 'src/users/entities/user.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { CartItemEntity } from 'src/cart/entities/cart-item.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductEntity } from 'src/cart/entities/product.entity';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [
    UserEntity,
    CartEntity,
    CartItemEntity,
    OrderEntity,
    ProductEntity,
  ],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: true,
  migrationsRun: false,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
};

const dataSource: DataSource = new DataSource(dataSourceOptions);
export default dataSource;
