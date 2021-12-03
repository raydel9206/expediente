import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { EspecialidadService } from '../services/especialidad.service';

@Controller('especialidad')
export class EspecialidadController {
  constructor(private readonly antecedenteService: EspecialidadService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.antecedenteService.findAll(findPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.antecedenteService.findOne(+id);
  }
}
