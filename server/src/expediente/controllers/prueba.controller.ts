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
import { CreatePruebaDto } from '../dto/create-prueba.dto';
import { PruebaService } from '../services/prueba.service';

@Controller('prueba')
export class PruebaController {
  constructor(private readonly pruebaService: PruebaService) {}

  @Get()
  findAll(@Query() query) {
    return this.pruebaService.findAll(query.asistencia_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPruebaDto: CreatePruebaDto) {
    return this.pruebaService.create(createPruebaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pruebaService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() createPruebaDto: CreatePruebaDto) {
    return this.pruebaService.update(+id, createPruebaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pruebaService.remove(+id);
  }
}
