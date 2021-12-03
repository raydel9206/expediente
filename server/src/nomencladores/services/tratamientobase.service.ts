import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { TratamientoBase } from '../entities/tratamientobase.entity';
import { TratamientoBaseRepository } from '../repositories/tratamientobase.repository';

@Injectable()
export class TratamientoBaseService {
  constructor(private tratamientobaseRepository: TratamientoBaseRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.tratamientobaseRepository.findCombo();
    } else {
      return await this.tratamientobaseRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<TratamientoBase> {
    const entity = await this.tratamientobaseRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El tratamientobase no fué encontrado');
    }
    return entity;
  }
}
