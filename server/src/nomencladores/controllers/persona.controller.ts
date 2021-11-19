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
import { CreatePersonaDto } from '../dto/create-persona.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

// import { UpdatePersonaDto } from '../dto/update-persona.dto';
import { PersonaService } from '../services/persona.service';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.personaService.findAll(findPaginationDto);
  }

  @Get('antecedentes')
  getContactos(@Query() query) {
    return this.personaService.getAntecedentes(query.expediente_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personaService.create(createPersonaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personaService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() createPersonaDto: CreatePersonaDto) {
    return this.personaService.update(+id, createPersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personaService.remove(+id);
  }
}
