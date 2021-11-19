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
import { CreateSeguimientoDto } from '../dto/create-seguimiento.dto';
import { SeguimientoService } from '../services/seguimiento.service';

@Controller('seguimiento')
export class SeguimientoController {
  constructor(private readonly seguimientoService: SeguimientoService) {}

  @Get()
  findAll(@Query() query) {
    return this.seguimientoService.findAll(query.expediente_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createSeguimientoDto: CreateSeguimientoDto) {
    return this.seguimientoService.create(createSeguimientoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seguimientoService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createSeguimientoDto: CreateSeguimientoDto,
  ) {
    return this.seguimientoService.update(+id, createSeguimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seguimientoService.remove(+id);
  }
}
