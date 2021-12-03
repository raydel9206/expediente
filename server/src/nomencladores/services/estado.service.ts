import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { Estado } from '../entities/estado.entity';
import { EstadoRepository } from '../repositories/estado.repository';

@Injectable()
export class EstadoService {
  constructor(private estadoRepository: EstadoRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.estadoRepository.findCombo();
    } else {
      return await this.estadoRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<Estado> {
    const entity = await this.estadoRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El estado no fué encontrado');
    }
    return entity;
  }
}
