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
import { CreateHospitalDto } from '../dto/create-hospital.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

// import { UpdateHospitalDto } from '../dto/update-hospital.dto';
import { HospitalService } from '../services/hospital.service';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Get()
  findAll(@Query() findPaginationDto: FindPaginationDto) {
    return this.hospitalService.findAll(findPaginationDto);
  }

  @Get('/byMunicipio')
  findByProvincia(@Query() query) {
    return this.hospitalService.findByMunicipio(query.municipio_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalService.create(createHospitalDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createHospitalDto: CreateHospitalDto,
  ) {
    return this.hospitalService.update(+id, createHospitalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalService.remove(+id);
  }
}
