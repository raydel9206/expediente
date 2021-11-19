import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePoliclinicoDto } from '../../nomencladores/dto/create-policlinico.dto';
import { Policlinico } from '../../nomencladores/entities/policlinico.entity';
import { PoliclinicoRepository } from '../repositories/policlinico.repository';
import { MunicipioRepository } from '../repositories/municipio.repository';
import { FindPaginationDto } from '../dto/find-pagination.dto';

@Injectable()
export class PoliclinicoService {
  constructor(
    private policlinicoRepository: PoliclinicoRepository,
    private municipioRepository: MunicipioRepository,
  ) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    console.log;
    const { combo, keyword, take, skip } = findPaginationDto;
  
    if (combo !== undefined) {
      return this.policlinicoRepository.findCombo();
    } else {
      return await this.policlinicoRepository.findAll(skip, take, keyword);
    }
  }

  async findByMunicipio(municipio_id: string) {
    const policlinicos = await this.policlinicoRepository.find({
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
      rows: policlinicos,
    };
  }

  async create(
    createPoliclinicoDto: CreatePoliclinicoDto,
  ): Promise<Policlinico> {
    const { nombre, municipio_id } = createPoliclinicoDto;
    const municipio = await this.municipioRepository.findOne(municipio_id);
    const entity = new Policlinico();
    entity.nombre = nombre;
    entity.municipio = municipio;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Policlinico> {
    const entity = await this.policlinicoRepository.findOne({
      relations: ['municipio'],
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El país no fué encontrado');
    }
    return entity;
  }

  async update(
    id: number,
    createPoliclinicoDto: CreatePoliclinicoDto,
  ): Promise<Policlinico> {
    const { nombre, municipio_id } = createPoliclinicoDto;
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
