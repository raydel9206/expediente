import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateSintomaDto } from '../dto/create-sintoma.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { Sintoma } from '../entities/sintoma.entity';
import { SintomaRepository } from '../repositories/sintoma.repository';

@Injectable()
export class SintomaService {
  constructor(private sintomaRepository: SintomaRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.sintomaRepository.findCombo();
    } else {
      return await this.sintomaRepository.findAll(skip, take, keyword);
    }
  }

  // async byExpediente(expediente_id: string) {
  //   return await this.sintomaRepository.byExpediente(expediente_id);
  // }

  async create(createSintomaDto: CreateSintomaDto): Promise<Sintoma> {
    const { descripcion } = createSintomaDto;
    const entity = new Sintoma();
    entity.descripcion = descripcion;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Sintoma> {
    const entity = await this.sintomaRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El síntoma fué encontrado');
    }
    return entity;
  }

  async update(
    id: number,
    createSintomaDto: CreateSintomaDto,
  ): Promise<Sintoma> {
    const { descripcion } = createSintomaDto;
    const entity = await this.findOne(id);

    entity.descripcion = descripcion;
    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
