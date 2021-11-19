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
import { CreateAreaSaludDto } from '../../nomencladores/dto/create-areaSalud.dto';
import { FindPaginationDto } from '../../nomencladores/dto/find-pagination.dto';

// import { UpdateAreaSaludDto } from '../dto/update-areaSalud.dto';
import { AreaSaludService } from '../../nomencladores/services/areaSalud.service';

@Controller('areaSalud')
export class AreaSaludController {
  constructor(private readonly areaSaludService: AreaSaludService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.areaSaludService.findAll(findPaginationDto);
  }

  @Get('/byPoliclinico')
  findByProvincia(@Query() query) {
    return this.areaSaludService.findByPoliclinico(query.policlinico_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createAreaSaludDto: CreateAreaSaludDto) {
    return this.areaSaludService.create(createAreaSaludDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaSaludService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createAreaSaludDto: CreateAreaSaludDto,
  ) {
    return this.areaSaludService.update(+id, createAreaSaludDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaSaludService.remove(+id);
  }
}
