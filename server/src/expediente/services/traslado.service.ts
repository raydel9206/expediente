import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrasladoDto } from '../dto/create-traslado.dto';
import { Traslado } from '../entities/traslado.entity';
// import { UpdateTrasladoDto } from '../dto/update-areaSalud.dto';
import { TrasladoRepository } from '../repositories/traslado.repository';
import { ExpedienteRepository } from '../repositories/expediente.repository';

@Injectable()
export class TrasladoService {
  constructor(
    private trasladoRepository: TrasladoRepository,
    private expedienteRepository: ExpedienteRepository,
  ) {}

  async findAll(expediente_id: string) {
    return await this.trasladoRepository.findAll(expediente_id);
  }

  async create(createTrasladoDto: CreateTrasladoDto): Promise<Traslado> {
    const { fecha, agente, demanda, expediente_id } = createTrasladoDto;

    const expediente = await this.expedienteRepository.findOne(expediente_id);
    if (!expediente) throw new NotFoundException('El expediente no existe');

    const entity = new Traslado();
    entity.fecha = new Date(fecha);
    entity.agente = agente;
    entity.demanda = demanda;
    entity.expediente = expediente;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Traslado> {
    const entity = await this.trasladoRepository.findOne({
      id,
      visible: true,
    });
    if (!entity) {
      throw new NotFoundException('El traslado no fué encontrado');
    }
    return entity;
  }

  async update(
    id: number,
    createTrasladoDto: CreateTrasladoDto,
  ): Promise<Traslado> {
    const { fecha, agente, demanda, expediente_id } = createTrasladoDto;

    const expediente = await this.expedienteRepository.findOne(expediente_id);
    if (!expediente) throw new NotFoundException('El expediente no existe');

    const entity = await this.findOne(id);
    entity.fecha = new Date(fecha);
    entity.agente = agente;
    entity.demanda = demanda;
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
