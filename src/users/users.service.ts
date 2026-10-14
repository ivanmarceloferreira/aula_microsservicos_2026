import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  create(firstName: string, lastName: string, email: string) {
    // IDEMPOTENCY CHECK
    if (email) {
      this.usersRepository.findOneBy({ email }).then((existingUser) => {
        if (existingUser) {
          throw new Error('Email already in use');
        }
      });
    }

    const user = this.usersRepository.create({ firstName, lastName, email });
    return this.usersRepository.save(user);
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: number, attrs: Partial<User>) {
    let user = await this.findOne(id);
    Object.assign(user!, attrs);
    user = await this.usersRepository.save(user!);

    return user;
  }
}
