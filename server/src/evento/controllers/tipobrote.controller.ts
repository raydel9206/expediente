import { Controller, Get } from '@nestjs/common';
import { TipoBroteService } from '../services/tipobrote.service';

@Controller('tipobrote')
export class TipoBroteController {
  constructor(private readonly tipobroteService: TipoBroteService) {}

  @Get()
  findAll() {
    return this.tipobroteService.findAll();
  }
}
