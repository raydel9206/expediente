import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { TipoCaso } from '../entities/tipocaso.entity';
import { TipoCasoRepository } from '../repositories/tipocaso.repository';

@Injectable()
export class TipoCasoService {
  constructor(private tipocasoRepository: TipoCasoRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.tipocasoRepository.findCombo();
    } else {
      return await this.tipocasoRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<TipoCaso> {
    const entity = await this.tipocasoRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El tipo de caso no fué encontrado');
    }
    return entity;
  }
}
