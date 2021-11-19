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
import { CreateConsejoDto } from '../dto/create-consejo.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

// import { UpdateConsejoDto } from '../dto/update-consejo.dto';
import { ConsejoService } from '../services/consejo.service';

@Controller('consejo')
export class ConsejoController {
  constructor(private readonly consejoService: ConsejoService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.consejoService.findAll(findPaginationDto);
  }

  @Get('/byMunicipio')
  findByProvincia(@Query() query) {
    return this.consejoService.findByMunicipio(query.municipio_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createConsejoDto: CreateConsejoDto) {
    return this.consejoService.create(createConsejoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consejoService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() createConsejoDto: CreateConsejoDto) {
    return this.consejoService.update(+id, createConsejoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consejoService.remove(+id);
  }
}
