import { Injectable, NotFoundException } from '@nestjs/common';
import { TipoBroteRepository } from '../repositories/tipobrote.repository';

@Injectable()
export class TipoBroteService {
  constructor(private tipoBroteRepository: TipoBroteRepository) {}

  async findAll() {
    return await this.tipoBroteRepository.findAndCount();
  }
}
