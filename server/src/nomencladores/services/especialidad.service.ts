import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { Especialidad } from '../entities/especialidad.entity';
import { EspecialidadRepository } from '../repositories/especialidad.repository';

@Injectable()
export class EspecialidadService {
  constructor(private especialidadRepository: EspecialidadRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.especialidadRepository.findCombo();
    } else {
      return await this.especialidadRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<Especialidad> {
    const entity = await this.especialidadRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El especialidad no fué encontrado');
    }
    return entity;
  }
}
