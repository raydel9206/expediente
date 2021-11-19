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
import { CreateResultadoLabDto } from '../dto/create-resultadolab.dto';
import { ResultadoLabService } from '../services/resultadolab.service';

@Controller('resultadolab')
export class ResultadoLabController {
  constructor(private readonly resultadolabService: ResultadoLabService) {}

  @Get()
  findAll(@Query() query) {
    return this.resultadolabService.findAll(query.seguimiento_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createResultadoLabDto: CreateResultadoLabDto) {
    return this.resultadolabService.create(createResultadoLabDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultadolabService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createResultadoLabDto: CreateResultadoLabDto,
  ) {
    return this.resultadolabService.update(+id, createResultadoLabDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultadolabService.remove(+id);
  }
}
