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
import { CreateEstudioDto } from '../dto/create-estudio.dto';
import { EstudioService } from '../services/estudio.service';

@Controller('estudio')
export class EstudioController {
  constructor(private readonly estudioService: EstudioService) {}

  @Get()
  findAll(@Query() query) {
    return this.estudioService.findAll(query.seguimiento_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createEstudioDto: CreateEstudioDto) {
    return this.estudioService.create(createEstudioDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudioService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() createEstudioDto: CreateEstudioDto) {
    return this.estudioService.update(+id, createEstudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudioService.remove(+id);
  }
}
