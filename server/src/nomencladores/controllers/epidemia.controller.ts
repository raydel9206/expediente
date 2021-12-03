import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { EpidemiaService } from '../services/epidemia.service';

@Controller('epidemia')
export class EpidemiaController {
  constructor(private readonly antecedenteService: EpidemiaService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.antecedenteService.findAll(findPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.antecedenteService.findOne(+id);
  }
}
