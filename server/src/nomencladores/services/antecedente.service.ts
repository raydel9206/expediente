import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateAntecedenteDto } from '../dto/create-antecedente.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { Antecedente } from '../entities/antecedente.entity';
import { AntecedenteRepository } from '../repositories/antecedente.repository';

@Injectable()
export class AntecedenteService {
  constructor(private antecedenteRepository: AntecedenteRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.antecedenteRepository.findCombo();
    } else {
      return await this.antecedenteRepository.findAll(skip, take, keyword);
    }
  }

  async create(
    createAntecedenteDto: CreateAntecedenteDto,
  ): Promise<Antecedente> {
    const { nombre, descripcion } = createAntecedenteDto;

    const entity = new Antecedente();
    entity.nombre = nombre;
    entity.descripcion = descripcion;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Antecedente> {
    const entity = await this.antecedenteRepository.findOne({
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El antecedente no fué encontrado');
    }
    return entity;
  }

  async update(
    id: number,
    createAntecedenteDto: CreateAntecedenteDto,
  ): Promise<Antecedente> {
    const { nombre, descripcion } = createAntecedenteDto;
    const entity = await this.findOne(id);
    entity.nombre = nombre;
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
