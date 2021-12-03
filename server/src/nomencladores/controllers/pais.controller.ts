import { Pais } from './../entities/pais.entity';
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
  ParseIntPipe,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreatePaisDto } from '../dto/create-pais.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { PaisService } from '../services/pais.service';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';

@Controller('pais')
export class PaisController {
  constructor(private readonly paisService: PaisService) {}

  @Get()
  @ApiOperation({ summary: 'Get países' })
  @ApiResponse({
    status: 200,
    description: 'Obtener los países',
    type: [Pais],
  })
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.paisService.findAll(findPaginationDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create país' })
  @ApiCreatedResponse({
    description: 'Crear un país',
    type: Pais,
  })
  @UsePipes(ValidationPipe)
  create(@Body() createPaisDto: CreatePaisDto) {
    return this.paisService.create(createPaisDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paisService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() createPaisDto: CreatePaisDto) {
    return this.paisService.update(+id, createPaisDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paisService.remove(+id);
  }
}
