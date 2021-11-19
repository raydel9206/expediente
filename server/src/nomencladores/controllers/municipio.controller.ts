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
import { CreateMunicipioDto } from '../dto/create-municipio.dto';
import { MunicipioService } from '../services/municipio.service';

@Controller('municipio')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  @Get()
  findAll() {
    return this.municipioService.findAll();
  }

  @Get('/byProvincia')
  findByProvincia(@Query() query) {
    const { provincia_id } = query;
    return this.municipioService.findByProvincia(provincia_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createMunicipioDto: CreateMunicipioDto) {
    return this.municipioService.create(createMunicipioDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.municipioService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createMunicipioDto: CreateMunicipioDto,
  ) {
    return this.municipioService.update(+id, createMunicipioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.municipioService.remove(+id);
  }
}
