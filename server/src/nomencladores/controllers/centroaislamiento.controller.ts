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
import { CreateCentroAislamientoDto } from '../dto/create-centroaislamiento.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

// import { UpdateCentroAislamientoDto } from '../dto/update-centroaislamiento.dto';
import { CentroAislamientoService } from '../services/centroaislamiento.service';

@Controller('centroaislamiento')
export class CentroAislamientoController {
  constructor(private readonly centroaislamientoService: CentroAislamientoService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.centroaislamientoService.findAll(findPaginationDto);
  }

  @Get('/byMunicipio')
  findByProvincia(@Query() query) {
    return this.centroaislamientoService.findByMunicipio(query.municipio_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createCentroAislamientoDto: CreateCentroAislamientoDto) {
    return this.centroaislamientoService.create(createCentroAislamientoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centroaislamientoService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createCentroAislamientoDto: CreateCentroAislamientoDto,
  ) {
    return this.centroaislamientoService.update(+id, createCentroAislamientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centroaislamientoService.remove(+id);
  }
}
