import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { CategoriaOcupacional } from '../entities/categoriaocupacional.entity';
import { CategoriaOcupacionalRepository } from '../repositories/categoriaocupacional.repository';

@Injectable()
export class CategoriaOcupacionalService {
  constructor(
    private categoriaocupacionalRepository: CategoriaOcupacionalRepository,
  ) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.categoriaocupacionalRepository.findCombo();
    } else {
      return await this.categoriaocupacionalRepository.findAll(
        skip,
        take,
        keyword,
      );
    }
  }

  async findOne(id: number): Promise<CategoriaOcupacional> {
    const entity = await this.categoriaocupacionalRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El categoriaocupacional no fué encontrado');
    }
    return entity;
  }
}
