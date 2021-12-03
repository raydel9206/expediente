import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { FactorRiesgo } from '../entities/factorriesgo.entity';
import { FactorRiesgoRepository } from '../repositories/factorriesgo.repository';

@Injectable()
export class FactorRiesgoService {
  constructor(private factorriesgoRepository: FactorRiesgoRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.factorriesgoRepository.findCombo();
    } else {
      return await this.factorriesgoRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<FactorRiesgo> {
    const entity = await this.factorriesgoRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El factorriesgo no fué encontrado');
    }
    return entity;
  }
}
