import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { PizzasController } from './pizzas.controller';
import { Pizza } from './entities/pizza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Pizza,
  ])],
  controllers: [PizzasController],
  providers: [PizzasService]
})
export class PizzasModule {}
