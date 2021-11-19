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
import { CreateAntecedenteDto } from '../dto/create-antecedente.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

// import { UpdateAntecedenteDto } from '../dto/update-antecedente.dto';
import { AntecedenteService } from '../services/antecedente.service';

@Controller('antecedente')
export class AntecedenteController {
  constructor(private readonly antecedenteService: AntecedenteService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.antecedenteService.findAll(findPaginationDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createAntecedenteDto: CreateAntecedenteDto) {
    return this.antecedenteService.create(createAntecedenteDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.antecedenteService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createAntecedenteDto: CreateAntecedenteDto,
  ) {
    return this.antecedenteService.update(+id, createAntecedenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.antecedenteService.remove(+id);
  }
}
