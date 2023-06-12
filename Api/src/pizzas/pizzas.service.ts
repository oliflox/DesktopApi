import { Injectable, NotFoundException, Delete } from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from './entities/pizza.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PizzasService {

  constructor(@InjectRepository(Pizza) private data: Repository<Pizza>) { }

  create(dto: CreatePizzaDto): Promise<Pizza> {
    return this.data.save(dto);
  }

  findAll(): Promise<Pizza[]> {
    return this.data.find();
  }

  findOne(id: number): Promise<Pizza> {
    return this.data.findOneByOrFail({id}).catch(e => {
      throw new NotFoundException(id);
    });
  }

  async update(id: number, dto: UpdatePizzaDto): Promise<Pizza>{
    let done = await this.data.update(id, dto);
    if (done.affected != 1) {
      throw new NotFoundException(id);
    }
    return this.data.findOneByOrFail({id});
  }

  async remove(id: number): Promise<Pizza> {
    let done : DeleteResult = await this.data.delete(id);
    if (done.affected != 1) {
      throw new NotFoundException(id);
    }
    return this.data.findOneByOrFail({id});
  }
}