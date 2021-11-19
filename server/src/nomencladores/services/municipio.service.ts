import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMunicipioDto } from '../dto/create-municipio.dto';
import { Municipio } from '../entities/municipio.entity';
import { MunicipioRepository } from '../repositories/municipio.repository';
import { ProvinciaRepository } from '../repositories/provincia.repository';

@Injectable()
export class MunicipioService {
  constructor(
    private municipioRepository: MunicipioRepository,
    private provinciaRepository: ProvinciaRepository,
  ) {}

  async findAll() {
    return this.municipioRepository.findAll();
  }

  async findByProvincia(provincia_id: string) {
    const rows = await this.municipioRepository.find({
      relations: ['provincia'],
      where: {
        visible: true,
        provincia: {
          id: provincia_id,
        },
      },
      order: { nro_orden: 'ASC' },
    });

    return {
      rows: rows,
    };
  }

  async create(createMunicipioDto: CreateMunicipioDto): Promise<Municipio> {
    const { nombre, nro_orden, provincia_id } = createMunicipioDto;
    const provincia = await this.provinciaRepository.findOne(provincia_id);
    const entity = new Municipio();
    entity.nombre = nombre;
    entity.nro_orden = nro_orden;
    entity.provincia = provincia;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Municipio> {
    const entity = await this.municipioRepository.findOne({
      relations: ['provincia'],
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El municipio no fué encontrado');
    }
    return entity;
  }

  async update(
    id: number,
    createMunicipioDto: CreateMunicipioDto,
  ): Promise<Municipio> {
    const entity = await this.findOne(id);
    const { nombre, nro_orden, provincia_id } = createMunicipioDto;
    const provincia = await this.provinciaRepository.findOne(provincia_id);
    entity.nombre = nombre;
    entity.nro_orden = nro_orden;
    entity.provincia = provincia;
    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
