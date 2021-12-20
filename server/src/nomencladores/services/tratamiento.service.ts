import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';
import { Tratamiento } from '../entities/tratamiento.entity';

import { TratamientoRepository } from '../repositories/tratamiento.repository';

@Injectable()
export class TratamientoService {
  constructor(private tratamientoRepository: TratamientoRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.tratamientoRepository.findCombo();
    } else {
      return await this.tratamientoRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<Tratamiento> {
    const entity = await this.tratamientoRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El tratamiento base no fué encontrado');
    }
    return entity;
  }
}
