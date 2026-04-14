import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import  type { Dog } from './interfaces/dogs.interface';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}
  @Post()
  create(@Body() dog: Dog) {
    return this.dogsService.create(dog);
  }

  @Get("findAllDogs")
  findAll(): Dog[] {
    return this.dogsService.findAll();
  }

}
