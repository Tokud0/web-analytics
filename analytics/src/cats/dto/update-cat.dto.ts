import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './createCatDto';

export class UpdateCatDto extends PartialType(CreateCatDto) {}
