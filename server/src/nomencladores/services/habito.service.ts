import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { Habito } from '../entities/habito.entity';
import { HabitoRepository } from '../repositories/habito.repository';

@Injectable()
export class HabitoService {
  constructor(private habitoRepository: HabitoRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.habitoRepository.findCombo();
    } else {
      return await this.habitoRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<Habito> {
    const entity = await this.habitoRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El habito no fué encontrado');
    }
    return entity;
  }
}
