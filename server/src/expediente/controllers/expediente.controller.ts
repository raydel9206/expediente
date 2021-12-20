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
import { CreateExpedienteDto } from '../dto/create-expediente.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';
import { ExpedienteService } from '../services/expediente.service';

@Controller('expediente')
export class ExpedienteController {
  constructor(private readonly expedienteService: ExpedienteService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.expedienteService.findAll(findPaginationDto);
  }

  @Get('contactos')
  getContactos(@Query() query) {
    return this.expedienteService.getContactos(query);
  }

  @Get('sintomas')
  getSintomas(@Query() query) {
    return this.expedienteService.getSintomas(query.expediente_id);
  }

  @Get('tratamientos')
  getTratamientos(@Query() query) {
    return this.expedienteService.getTratamientos(query.expediente_id);
  }

  @Get('habitos')
  getHabitos(@Query() query) {
    return this.expedienteService.getHabitos(query.expediente_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createExpedienteDto: CreateExpedienteDto) {
    return this.expedienteService.create(createExpedienteDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expedienteService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createExpedienteDto: CreateExpedienteDto,
  ) {
    return this.expedienteService.update(+id, createExpedienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expedienteService.remove(+id);
  }

  @Post('contactos')
  addContacto(@Body() body) {
    return this.expedienteService.addContacto(body);
  }

  @Patch('contactos/:id')
  editContacto(@Body() body) {
    return this.expedienteService.editContacto(body);
  }

  @Delete(':expediente_id/contactos/:id')
  delContacto(
    @Param('expediente_id') expediente_id: string,
    @Param('id') id: string,
  ) {
    return this.expedienteService.delContacto(expediente_id, id);
  }
}
