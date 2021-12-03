import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { ImpresionDiagnosticaService } from '../services/impresiondiagnostica.service';

@Controller('impresiondiagnostica')
export class ImpresionDiagnosticaController {
  constructor(
    private readonly antecedenteService: ImpresionDiagnosticaService,
  ) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.antecedenteService.findAll(findPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.antecedenteService.findOne(+id);
  }
}
