import { Injectable } from '@nestjs/common';
import { Dog } from './interfaces/dogs.interface';

@Injectable()
export class DogsService {
  private readonly dogs: Dog[] = [];

  create(dog: Dog) {
    this.dogs.push(dog);
    return dog;
  }

  findAll(): Dog[] {
    return this.dogs;
  }
}