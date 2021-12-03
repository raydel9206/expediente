import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { CausaFallecimiento } from '../entities/causafallecimiento.entity';
import { CausaFallecimientoRepository } from '../repositories/causafallecimiento.repository';

@Injectable()
export class CausaFallecimientoService {
  constructor(
    private causafallecimientoRepository: CausaFallecimientoRepository,
  ) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.causafallecimientoRepository.findCombo();
    } else {
      return await this.causafallecimientoRepository.findAll(
        skip,
        take,
        keyword,
      );
    }
  }

  async findOne(id: number): Promise<CausaFallecimiento> {
    const entity = await this.causafallecimientoRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El causafallecimiento no fué encontrado');
    }
    return entity;
  }
}
