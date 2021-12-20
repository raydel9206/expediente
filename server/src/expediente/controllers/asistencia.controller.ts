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
import { CreateAsistenciaDto } from '../dto/create-asistencia.dto';
import { AsistenciaService } from '../services/asistencia.service';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Get()
  findAll(@Query() query) {
    return this.asistenciaService.findAll(query.expediente_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciaService.create(createAsistenciaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asistenciaService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createAsistenciaDto: CreateAsistenciaDto,
  ) {
    return this.asistenciaService.update(+id, createAsistenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asistenciaService.remove(+id);
  }
}
