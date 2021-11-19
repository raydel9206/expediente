import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProvinciaDto } from '../dto/create-provincia.dto';
import { Provincia } from '../entities/provincia.entity';
import { ProvinciaRepository } from '../repositories/provincia.repository';

@Injectable()
export class ProvinciaService {
  constructor(private provinciaRepository: ProvinciaRepository) {}

  async findAll() {
    return this.provinciaRepository.findAll();
  }

  async create(createProvinciaDto: CreateProvinciaDto): Promise<Provincia> {
    const { nombre, nro_orden } = createProvinciaDto;
    const entity = new Provincia();
    entity.nombre = nombre;
    entity.nro_orden = nro_orden;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Provincia> {
    const entity = await this.provinciaRepository.findOne({
      id,
      visible: true,
    });
    if (!entity) {
      throw new NotFoundException('El país no fué encontrado');
    }
    return entity;
  }

  async update(
    id: number,
    createProvinciaDto: CreateProvinciaDto,
  ): Promise<Provincia> {
    const entity = await this.findOne(id);
    const { nombre, nro_orden } = createProvinciaDto;
    entity.nombre = nombre;
    entity.nro_orden = nro_orden;
    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
