import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return this.userRepository.save(user)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({id})
    if (!user) throw new NotFoundException('Usuário não encontrado')
    this.userRepository.merge(user, updateUserDto)
  return await this.userRepository.save(user)
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({id})
    if (!user) throw new NotFoundException('Usuário não encontrado')
    return this.userRepository.remove(user)
  }
}
