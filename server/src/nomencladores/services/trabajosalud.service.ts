import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { TrabajoSalud } from '../entities/trabajosalud.entity';
import { TrabajoSaludRepository } from '../repositories/trabajosalud.repository';

@Injectable()
export class TrabajoSaludService {
  constructor(private trabajosaludRepository: TrabajoSaludRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.trabajosaludRepository.findCombo();
    } else {
      return await this.trabajosaludRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<TrabajoSalud> {
    const entity = await this.trabajosaludRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El trabajosalud no fué encontrado');
    }
    return entity;
  }
}
