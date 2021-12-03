import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { MetodoHallazgo } from '../entities/metodohallazgo.entity';
import { MetodoHallazgoRepository } from '../repositories/metodohallazgo.repository';

@Injectable()
export class MetodoHallazgoService {
  constructor(private metodohallazgoRepository: MetodoHallazgoRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.metodohallazgoRepository.findCombo();
    } else {
      return await this.metodohallazgoRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<MetodoHallazgo> {
    const entity = await this.metodohallazgoRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El método de hallazgo no fué encontrado');
    }
    return entity;
  }
}
