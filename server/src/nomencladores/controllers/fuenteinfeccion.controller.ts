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
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { FuenteInfeccionService } from '../services/fuenteinfeccion.service';

@Controller('fuenteinfeccion')
export class FuenteInfeccionController {
  constructor(private readonly antecedenteService: FuenteInfeccionService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.antecedenteService.findAll(findPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.antecedenteService.findOne(+id);
  }
}
