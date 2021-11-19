import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateConsejoDto } from '../dto/create-consejo.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';

import { Consejo } from '../entities/consejo.entity';
import { ConsejoRepository } from '../repositories/consejo.repository';
import { MunicipioRepository } from '../repositories/municipio.repository';

@Injectable()
export class ConsejoService {
  constructor(
    private consejoRepository: ConsejoRepository,
    private municipioRepository: MunicipioRepository,
  ) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    if (combo !== undefined) {
      return this.consejoRepository.findCombo();
    } else {
      return await this.consejoRepository.findAll(skip, take, keyword);
    }
  }

  async findByMunicipio(municipio_id: string) {
    const rows = await this.consejoRepository.find({
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

  async create(createConsejoDto: CreateConsejoDto): Promise<Consejo> {
    const { nombre, municipio_id } = createConsejoDto;
    const municipio = await this.municipioRepository.findOne(municipio_id);
    const entity = new Consejo();
    entity.nombre = nombre;
    entity.municipio = municipio;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Consejo> {
    const entity = await this.consejoRepository.findOne({
      relations: ['municipio'],
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El consejo no fué encontrado');
    }
    return entity;
  }

  async update(
    id: number,
    createConsejoDto: CreateConsejoDto,
  ): Promise<Consejo> {
    const { nombre, municipio_id } = createConsejoDto;
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
