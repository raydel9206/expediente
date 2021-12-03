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

import { TrabajoSaludService } from '../services/trabajosalud.service';

@Controller('trabajosalud')
export class TrabajoSaludController {
  constructor(private readonly antecedenteService: TrabajoSaludService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.antecedenteService.findAll(findPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.antecedenteService.findOne(+id);
  }
}
