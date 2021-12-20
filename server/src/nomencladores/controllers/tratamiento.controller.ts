import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { query } from 'express';
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { TratamientoService } from '../services/tratamiento.service';

@Controller('tratamiento')
export class TratamientoController {
  constructor(private readonly tratamientoService: TratamientoService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.tratamientoService.findAll(findPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tratamientoService.findOne(+id);
  }
}
