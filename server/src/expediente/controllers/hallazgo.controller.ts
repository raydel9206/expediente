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
import { CreateHallazgoDto } from '../dto/create-hallazgo.dto';
import { HallazgoService } from '../services/hallazgo.service';

@Controller('hallazgo')
export class HallazgoController {
  constructor(private readonly hallazgoService: HallazgoService) {}

  @Get()
  findAll() {
    return this.hallazgoService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createHallazgoDto: CreateHallazgoDto) {
    return this.hallazgoService.create(createHallazgoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hallazgoService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createHallazgoDto: CreateHallazgoDto,
  ) {
    return this.hallazgoService.update(+id, createHallazgoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hallazgoService.remove(+id);
  }
}
