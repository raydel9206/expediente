import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { ResultadoPrueba } from '../entities/resultadoprueba.entity';
import { ResultadoPruebaRepository } from '../repositories/resultadoprueba.repository';

@Injectable()
export class ResultadoPruebaService {
  constructor(private resultadopruebaRepository: ResultadoPruebaRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.resultadopruebaRepository.findCombo();
    } else {
      return await this.resultadopruebaRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<ResultadoPrueba> {
    const entity = await this.resultadopruebaRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El resultado de prueba no fué encontrado');
    }
    return entity;
  }
}
