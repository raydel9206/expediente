import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateAreaSaludDto } from '../dto/create-areaSalud.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { AreaSalud } from '../entities/areaSalud.entity';
// import { UpdateAreaSaludDto } from '../dto/update-policlinico.dto';
import { AreaSaludRepository } from '../repositories/areaSalud.repository';
import { PoliclinicoRepository } from '../repositories/policlinico.repository';

@Injectable()
export class AreaSaludService {
  constructor(
    private areaSaludRepository: AreaSaludRepository,
    private policlinicoRepository: PoliclinicoRepository,
  ) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;
    if (combo !== undefined) {
      return this.areaSaludRepository.findCombo();
    } else {
      return await this.areaSaludRepository.findAll(skip, take, keyword);
    }
  }

  async findByPoliclinico(policlinico_id: string) {
    const rows = await this.areaSaludRepository.find({
      relations: ['policlinico'],
      where: {
        visible: true,
        policlinico: {
          id: policlinico_id,
        },
      },
      order: { nombre: 'ASC' },
    });

    return {
      rows: rows,
    };
  }

  async create(createAreaSaludDto: CreateAreaSaludDto): Promise<AreaSalud> {
    const { nombre, policlinico_id } = createAreaSaludDto;
    const policlinico = await this.policlinicoRepository.findOne(
      policlinico_id,
    );
    const entity = new AreaSalud();
    entity.nombre = nombre;
    entity.policlinico = policlinico;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<AreaSalud> {
    const entity = await this.areaSaludRepository.findOne({
      relations: ['policlinico'],
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El área de salud no fué encontrada');
    }
    return entity;
  }

  async update(
    id: number,
    createAreaSaludDto: CreateAreaSaludDto,
  ): Promise<AreaSalud> {
    const { nombre, policlinico_id } = createAreaSaludDto;
    const entity = await this.findOne(id);
    const policlinico = await this.policlinicoRepository.findOne(
      policlinico_id,
    );
    entity.nombre = nombre;
    entity.policlinico = policlinico;
    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
