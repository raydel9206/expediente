import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { TipoPrueba } from '../entities/tipoprueba.entity';
import { TipoPruebaRepository } from '../repositories/tipoprueba.repository';

@Injectable()
export class TipoPruebaService {
  constructor(private tipopruebaRepository: TipoPruebaRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.tipopruebaRepository.findCombo();
    } else {
      return await this.tipopruebaRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<TipoPrueba> {
    const entity = await this.tipopruebaRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El tipo de prueba no fué encontrado');
    }
    return entity;
  }
}
