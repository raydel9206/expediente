import { Injectable, NotFoundException } from '@nestjs/common';
import { Like } from 'typeorm';

import { CreateHospitalDto } from '../dto/create-hospital.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { Hospital } from '../entities/hospital.entity';
import { HospitalRepository } from '../repositories/hospital.repository';
import { MunicipioRepository } from '../repositories/municipio.repository';

@Injectable()
export class HospitalService {
  constructor(
    private hospitalRepository: HospitalRepository,
    private municipioRepository: MunicipioRepository,
  ) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.hospitalRepository.findCombo();
    } else {
      return await this.hospitalRepository.findAll(skip, take, keyword);
    }
  }

  async findByMunicipio(municipio_id: string) {
    const rows = await this.hospitalRepository.find({
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

  async create(createHospitalDto: CreateHospitalDto): Promise<Hospital> {
    const { nombre, municipio_id } = createHospitalDto;
    const municipio = await this.municipioRepository.findOne(municipio_id);
    const entity = new Hospital();
    entity.nombre = nombre;
    entity.municipio = municipio;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Hospital> {
    const entity = await this.hospitalRepository.findOne({
      relations: ['municipio'],
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El hospital no fué encontrado');
    }
    return entity;
  }

  async update(
    id: number,
    createHospitalDto: CreateHospitalDto,
  ): Promise<Hospital> {
    const { nombre, municipio_id } = createHospitalDto;
    const entity = await this.findOne(id);
    const municipio = await this.municipioRepository.findOne(municipio_id);
    entity.nombre = nombre;
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
