import { Controller, Get, Query, Req, Headers, Ip, Redirect, Param, Post, Body, HttpException, HttpStatus, UseFilters, ForbiddenException, ParseIntPipe } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CatsService } from './cats.service';
import { UseGuards } from '@nestjs/common';
import { Observable, of, map } from 'rxjs';
import { CreateCatDto } from './dto/createCatDto';
import { YelnurException } from 'src/common/exceptions/yelnur.exception';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';


@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('search')
  searchByAge(@Query('age', ParseIntPipe) age: number) {
    return this.catsService.findOne(age);
  }

  @Get('findAll')
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get("except")
  async checkExcept() {
    try {
      return await this.catsService.findAll()
    } catch(error) {
      throw new HttpException(
        {
          message: "This is a custom message",
          status: HttpStatus.FORBIDDEN
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error
        }
      )
    }
  }

  @Get('yelnurexception')
  async checkYelnur() {
    throw new YelnurException()
  }

  @Get(':age') //Менять надо айди
  @UseFilters(HttpExceptionFilter) 
  findOne(@Param('age', ParseIntPipe) age: number): Cat {
    return this.catsService.findOne(age); 
  }
    
  @Post()
  @UseFilters(HttpExceptionFilter)
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    throw new ForbiddenException();
  }

  @Post("postus")
  @Roles(["admin"])
  async postus(@Body() createCatDto: CreateCatDto) {
        const data = await createCatDto
        const res = {...data, date: Date.now()}
        return res
  }
}