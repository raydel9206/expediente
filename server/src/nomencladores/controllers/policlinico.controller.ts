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
import { CreatePoliclinicoDto } from '../dto/create-policlinico.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

// import { UpdatePoliclinicoDto } from '../dto/update-policlinico.dto';
import { PoliclinicoService } from '../services/policlinico.service';

@Controller('policlinico')
export class PoliclinicoController {
  constructor(private readonly policlinicoService: PoliclinicoService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.policlinicoService.findAll(findPaginationDto);
  }

  @Get('/byMunicipio')
  findByProvincia(@Query() query) {
    const { municipio_id } = query;
    return this.policlinicoService.findByMunicipio(municipio_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPoliclinicoDto: CreatePoliclinicoDto) {
    return this.policlinicoService.create(createPoliclinicoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policlinicoService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createPoliclinicoDto: CreatePoliclinicoDto,
  ) {
    return this.policlinicoService.update(+id, createPoliclinicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.policlinicoService.remove(+id);
  }
}
