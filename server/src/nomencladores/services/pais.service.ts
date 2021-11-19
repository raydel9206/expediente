import { Injectable, NotFoundException } from '@nestjs/common';

import { CreatePaisDto } from '../dto/create-pais.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { Pais } from '../entities/pais.entity';
import { PaisRepository } from '../repositories/pais.repository';

@Injectable()
export class PaisService {
  constructor(private paisRepository: PaisRepository) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;
    if (combo !== undefined) {
      return this.paisRepository.findCombo();
    } else {
      return await this.paisRepository.findAll(skip, take, keyword);
    }
  }

  async create(createPaisDto: CreatePaisDto): Promise<Pais> {
    const { nombre, nacionalidad } = createPaisDto;
    const entity = new Pais();
    entity.nombre = nombre;
    entity.nacionalidad = nacionalidad;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Pais> {
    const entity = await this.paisRepository.findOne({
      id,
      visible: true,
    });
    if (!entity) {
      throw new NotFoundException('El país no fué encontrado');
    }
    return entity;
  }

  async update(id: number, createPaisDto: CreatePaisDto): Promise<Pais> {
    const entity = await this.findOne(id);
    const { nombre, nacionalidad } = createPaisDto;

    entity.nombre = nombre;
    entity.nacionalidad = nacionalidad;
    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
