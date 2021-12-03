import { Injectable, NotFoundException } from '@nestjs/common';

import { FindPaginationDto } from '../dto/find-pagination.dto';

import { ImpresionDiagnostica } from '../entities/impresiondiagnostica.entity';
import { ImpresionDiagnosticaRepository } from '../repositories/impresiondiagnostica.repository';

@Injectable()
export class ImpresionDiagnosticaService {
  constructor(private impresiondiagnosticaRepository: ImpresionDiagnosticaRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.impresiondiagnosticaRepository.findCombo();
    } else {
      return await this.impresiondiagnosticaRepository.findAll(skip, take, keyword);
    }
  }

  async findOne(id: number): Promise<ImpresionDiagnostica> {
    const entity = await this.impresiondiagnosticaRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El impresiondiagnostica no fué encontrado');
    }
    return entity;
  }
}
