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
import { CreatePersonalSaludDto } from '../dto/create-personalsalud.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

// import { UpdatePersonalSaludDto } from '../dto/update-personalsalud.dto';
import { PersonalSaludService } from '../services/personalsalud.service';

@Controller('personalsalud')
export class PersonalSaludController {
  constructor(private readonly personalsaludService: PersonalSaludService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.personalsaludService.findAll(findPaginationDto);
  } 

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPersonalSaludDto: CreatePersonalSaludDto) {
    return this.personalsaludService.create(createPersonalSaludDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalsaludService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createPersonalSaludDto: CreatePersonalSaludDto,
  ) {
    return this.personalsaludService.update(+id, createPersonalSaludDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalsaludService.remove(+id);
  }
}
