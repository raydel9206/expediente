import {
  Controller,
  Get, 
  Param, 
  Query,
} from '@nestjs/common';
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { ParentescoService } from '../services/parentesco.service';

@Controller('parentesco')
export class ParentescoController {
  constructor(private readonly antecedenteService: ParentescoService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.antecedenteService.findAll(findPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.antecedenteService.findOne(+id);
  }
}
