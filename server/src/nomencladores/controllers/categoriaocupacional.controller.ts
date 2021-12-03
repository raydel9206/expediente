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

import { CategoriaOcupacionalService } from '../services/categoriaocupacional.service';

@Controller('categoriaocupacional')
export class CategoriaOcupacionalController {
  constructor(private readonly antecedenteService: CategoriaOcupacionalService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.antecedenteService.findAll(findPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.antecedenteService.findOne(+id);
  }
}
