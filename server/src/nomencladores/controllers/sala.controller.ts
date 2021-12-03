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
import { CreateSalaDto } from '../dto/create-sala.dto';
import { SalaService } from '../services/sala.service';

@Controller('sala')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Get()
  findAll() {
    return this.salaService.findAll();
  }

  @Get('/byHospital')
  findByHospital(@Query() query) {
    const { hospital_id } = query;
    return this.salaService.findByHospital(hospital_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createSalaDto: CreateSalaDto) {
    return this.salaService.create(createSalaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salaService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() createSalaDto: CreateSalaDto) {
    return this.salaService.update(+id, createSalaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaService.remove(+id);
  }
}
