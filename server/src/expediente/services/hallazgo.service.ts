import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHallazgoDto } from '../dto/create-hallazgo.dto';
import { Hallazgo } from '../entities/hallazgo.entity';
import { HallazgoRepository } from '../repositories/hallazgo.repository';
import { ExpedienteRepository } from '../repositories/expediente.repository';

@Injectable()
export class HallazgoService {
  constructor(
    private hallazgoRepository: HallazgoRepository,
    private expedienteRepository: ExpedienteRepository,
  ) {}

  async findAll(): Promise<Hallazgo[]> {
    return await this.hallazgoRepository.find({
      relations: ['asistencia'],
      where: {
        visible: true,
      },
    });
  }

  async create(createHallazgoDto: CreateHallazgoDto): Promise<Hallazgo> {
    const { observaciones, expediente_id } = createHallazgoDto;
    const expediente = await this.expedienteRepository.findOne(expediente_id);
    const entity = new Hallazgo();
    entity.observaciones = observaciones;
    entity.expediente = expediente;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Hallazgo> {
    const entity = await this.hallazgoRepository.findOne({
      relations: ['asistencia'],
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
    createHallazgoDto: CreateHallazgoDto,
  ): Promise<Hallazgo> {
    const entity = await this.findOne(id);
    const { observaciones, expediente_id } = createHallazgoDto;
    const expediente = await this.expedienteRepository.findOne(expediente_id);
    entity.observaciones = observaciones;
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
