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
import { CreateSintomaDto } from '../dto/create-sintoma.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { SintomaService } from '../services/sintoma.service';

@Controller('sintoma')
export class SintomaController {
  constructor(private readonly sintomaService: SintomaService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.sintomaService.findAll(findPaginationDto);
  }

  // @Get('/byExpediente')
  // byExpediente(@Query() query) {
  //   return this.sintomaService.byExpediente(query.expediente_id);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createSintomaDto: CreateSintomaDto) {
    return this.sintomaService.create(createSintomaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sintomaService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() createSintomaDto: CreateSintomaDto) {
    return this.sintomaService.update(+id, createSintomaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sintomaService.remove(+id);
  }
}
