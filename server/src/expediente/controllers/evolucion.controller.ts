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
} from '@nestjs/common';
import { CreateEvolucionDto } from '../dto/create-evolucion.dto';
import { EvolucionService } from '../services/evolucion.service';

@Controller('evolucion')
export class EvolucionController {
  constructor(private readonly evolucionService: EvolucionService) {}

  @Get()
  findAll() {
    return this.evolucionService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createEvolucionDto: CreateEvolucionDto) {
    return this.evolucionService.create(createEvolucionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evolucionService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createEvolucionDto: CreateEvolucionDto,
  ) {
    return this.evolucionService.update(+id, createEvolucionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evolucionService.remove(+id);
  }
}
