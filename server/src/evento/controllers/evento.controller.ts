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
import { CreateEventoDto } from '../dto/create-evento.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';
import { EventoService } from '../services/evento.service';

@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.eventoService.findAll(findPaginationDto);
  }

  @Get('contactos')
  getContactos(@Query() query) {
    return this.eventoService.getMedidas(query.evento_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventoService.create(createEventoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventoService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() createEventoDto: CreateEventoDto) {
    return this.eventoService.update(+id, createEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventoService.remove(+id);
  }
}
