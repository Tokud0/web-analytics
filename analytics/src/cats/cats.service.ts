import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/createCatDto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private readonly cats: CreateCatDto[] = [];

  create(cat: CreateCatDto) {
    this.cats.push(cat);
    return cat;
  }

  findAll(): CreateCatDto[] {
    return this.cats;
  }
  
  findOne(id: number): Cat {
  const needed = this.cats.find((cat) => cat.age === id);
  
  if (!needed) {
    throw new NotFoundException("Cat not found");
  }
  
  return needed;
}
}