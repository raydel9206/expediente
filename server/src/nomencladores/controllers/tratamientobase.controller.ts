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

import { TratamientoBaseService } from '../services/tratamientobase.service';

@Controller('tratamientobase')
export class TratamientoBaseController {
  constructor(private readonly antecedenteService: TratamientoBaseService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.antecedenteService.findAll(findPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.antecedenteService.findOne(+id);
  }
}
