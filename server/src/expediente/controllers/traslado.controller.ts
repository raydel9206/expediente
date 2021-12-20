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
import { CreateTrasladoDto } from '../dto/create-traslado.dto';
import { TrasladoService } from '../services/traslado.service';

@Controller('traslado')
export class TrasladoController {
  constructor(private readonly trasladoService: TrasladoService) {}

  @Get()
  findAll(@Query() query) {
    return this.trasladoService.findAll(query.expediente_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTrasladoDto: CreateTrasladoDto) {
    return this.trasladoService.create(createTrasladoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trasladoService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createTrasladoDto: CreateTrasladoDto,
  ) {
    return this.trasladoService.update(+id, createTrasladoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trasladoService.remove(+id);
  }
}
