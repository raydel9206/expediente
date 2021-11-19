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
import { CreateProvinciaDto } from '../dto/create-provincia.dto';
// import { UpdateProvinciaDto } from '../dto/update-provincia.dto';
import { ProvinciaService } from '../services/provincia.service';

@Controller('provincia')
export class ProvinciaController {
  constructor(private readonly provinciaService: ProvinciaService) {}

  @Get()
  findAll() {
    return this.provinciaService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createProvinciaDto: CreateProvinciaDto) {
    return this.provinciaService.create(createProvinciaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provinciaService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createProvinciaDto: CreateProvinciaDto,
  ) {
    return this.provinciaService.update(+id, createProvinciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provinciaService.remove(+id);
  }
}
