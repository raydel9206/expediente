import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { Epidemia } from '../entities/epidemia.entity';
import { EpidemiaRepository } from '../repositories/epidemia.repository';

@Injectable()
export class EpidemiaService {
  constructor(private epidemiaRepository: EpidemiaRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.epidemiaRepository.findCombo();
    } else {
      return await this.epidemiaRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<Epidemia> {
    const entity = await this.epidemiaRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El epidemia no fué encontrada');
    }
    return entity;
  }
}
