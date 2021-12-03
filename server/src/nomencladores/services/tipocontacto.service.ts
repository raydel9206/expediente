import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { TipoContacto } from '../entities/tipocontacto.entity';
import { TipoContactoRepository } from '../repositories/tipocontacto.repository';

@Injectable()
export class TipoContactoService {
  constructor(private tipocontactoRepository: TipoContactoRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.tipocontactoRepository.findCombo();
    } else {
      return await this.tipocontactoRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<TipoContacto> {
    const entity = await this.tipocontactoRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El tipo de contacto no fué encontrado');
    }
    return entity;
  }
}
