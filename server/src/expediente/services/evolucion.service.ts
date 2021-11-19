import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvolucionDto } from '../dto/create-evolucion.dto';
import { Evolucion } from '../entities/evolucion.entity';
import { EvolucionRepository } from '../repositories/evolucion.repository';
import { ExpedienteRepository } from '../repositories/expediente.repository';

@Injectable()
export class EvolucionService {
  constructor(
    private evolucionRepository: EvolucionRepository,
    private expedienteRepository: ExpedienteRepository,
  ) {}

  async findAll(): Promise<Evolucion[]> {
    return await this.evolucionRepository.find({
      relations: ['seguimiento'],
      where: {
        visible: true,
      },
    });
  }

  async create(createEvolucionDto: CreateEvolucionDto): Promise<Evolucion> {
    const { descripcion, expediente_id } = createEvolucionDto;
    const expediente = await this.expedienteRepository.findOne(expediente_id);
    const entity = new Evolucion();
    entity.descripcion = descripcion;
    entity.expediente = expediente;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Evolucion> {
    const entity = await this.evolucionRepository.findOne({
      relations: ['seguimiento'],
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('La evolución no fué encontrada');
    }
    return entity;
  }

  async update(
    id: number,
    createEvolucionDto: CreateEvolucionDto,
  ): Promise<Evolucion> {
    const entity = await this.findOne(id);
    const { descripcion, expediente_id } = createEvolucionDto;
    const expediente = await this.expedienteRepository.findOne(expediente_id);
    entity.descripcion = descripcion;
    entity.expediente = expediente;
    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
