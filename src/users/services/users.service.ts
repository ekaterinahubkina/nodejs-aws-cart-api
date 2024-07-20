import { Injectable } from '@nestjs/common';
import { User } from '../models';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(name: string): Promise<User> {
    return await this.userRepository.findOne({ where: { name } });
  }

  async createOne({ name, password }: User): Promise<User> {
    const newUser = this.userRepository.create({ name, password });
    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }
}
