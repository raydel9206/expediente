import { Injectable, NotFoundException } from '@nestjs/common';
import { Like } from 'typeorm';

import { CreateCentroAislamientoDto } from '../dto/create-centroaislamiento.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { CentroAislamiento } from '../entities/centroaislamiento.entity';
import { CentroAislamientoRepository } from '../repositories/centroaislamiento.repository';
import { MunicipioRepository } from '../repositories/municipio.repository';

@Injectable()
export class CentroAislamientoService {
  constructor(
    private centroaislamientoRepository: CentroAislamientoRepository,
    private municipioRepository: MunicipioRepository,
  ) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.centroaislamientoRepository.findCombo();
    } else {
      return await this.centroaislamientoRepository.findAll(
        skip,
        take,
        keyword,
      );
    }
  }

  async findByMunicipio(municipio_id: string) {
    const rows = await this.centroaislamientoRepository.find({
      relations: ['municipio'],
      where: {
        visible: true,
        municipio: {
          id: municipio_id,
        },
      },
      order: { nombre: 'ASC' },
    });

    return {
      rows: rows,
    };
  }

  async create(
    createCentroAislamientoDto: CreateCentroAislamientoDto,
  ): Promise<CentroAislamiento> {
    const { nombre, disponibilidad, municipio_id } = createCentroAislamientoDto;
    const municipio = await this.municipioRepository.findOne(municipio_id);
    const entity = new CentroAislamiento();
    entity.nombre = nombre;
    entity.disponibilidad = disponibilidad;
    entity.municipio = municipio;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<CentroAislamiento> {
    const entity = await this.centroaislamientoRepository.findOne({
      relations: ['municipio'],
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El centroaislamiento no fué encontrado');
    }
    return entity;
  }

  async update(
    id: number,
    createCentroAislamientoDto: CreateCentroAislamientoDto,
  ): Promise<CentroAislamiento> {
    const { nombre, disponibilidad, municipio_id } = createCentroAislamientoDto;
    const entity = await this.findOne(id);
    const municipio = await this.municipioRepository.findOne(municipio_id);
    entity.nombre = nombre;
    entity.disponibilidad = disponibilidad;
    entity.municipio = municipio;
    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
