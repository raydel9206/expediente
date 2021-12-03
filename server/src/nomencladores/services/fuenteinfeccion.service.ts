import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { FuenteInfeccion } from '../entities/fuenteinfeccion.entity';
import { FuenteInfeccionRepository } from '../repositories/fuenteinfeccion.repository';

@Injectable()
export class FuenteInfeccionService {
  constructor(private fuenteinfeccionRepository: FuenteInfeccionRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.fuenteinfeccionRepository.findCombo();
    } else {
      return await this.fuenteinfeccionRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<FuenteInfeccion> {
    const entity = await this.fuenteinfeccionRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El fuenteinfeccion no fué encontrado');
    }
    return entity;
  }
}
