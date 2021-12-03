import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { Parentesco } from '../entities/parentesco.entity';
import { ParentescoRepository } from '../repositories/parentesco.repository';

@Injectable()
export class ParentescoService {
  constructor(private parentescoRepository: ParentescoRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.parentescoRepository.findCombo();
    } else {
      return await this.parentescoRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<Parentesco> {
    const entity = await this.parentescoRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El parentesco no fué encontrado');
    }
    return entity;
  }
}
