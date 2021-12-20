import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultadoLabDto } from '../dto/create-resultadolab.dto';
import { ResultadoLab } from '../entities/resultadolab.entity';
import { ResultadoLabRepository } from '../repositories/resultadolab.repository';
import { AsistenciaRepository } from '../repositories/asistencia.repository';

@Injectable()
export class ResultadoLabService {
  constructor(
    private resultadoLabRepository: ResultadoLabRepository,
    private asistenciaRepository: AsistenciaRepository,
  ) {}

  async findAll(asistencia_id: string) {
    return await this.resultadoLabRepository.findAll(asistencia_id);
  }

  async create(
    createResultadoLabDto: CreateResultadoLabDto,
  ): Promise<ResultadoLab> {
    const { fecha, hemograma, gasometria, ionograma, otros, asistencia_id } =
      createResultadoLabDto;
    const asistencia = await this.asistenciaRepository.findOne(
      asistencia_id,
    );
    const entity = new ResultadoLab();
    entity.fecha = fecha;
    entity.hemograma = hemograma;
    entity.gasometria = gasometria;
    entity.ionograma = ionograma;
    entity.otros = otros;
    entity.asistencia = asistencia;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<ResultadoLab> {
    const entity = await this.resultadoLabRepository.findOne({
      relations: ['asistencia'],
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException(
        'El resultado de laboratorio no fué encontrado',
      );
    }
    return entity;
  }

  async update(
    id: number,
    createResultadoLabDto: CreateResultadoLabDto,
  ): Promise<ResultadoLab> {
    const entity = await this.findOne(id);
    const { fecha, hemograma, gasometria, ionograma, otros, asistencia_id } =
      createResultadoLabDto;
    const asistencia = await this.asistenciaRepository.findOne(
      asistencia_id,
    );
    entity.fecha = fecha;
    entity.hemograma = hemograma;
    entity.gasometria = gasometria;
    entity.ionograma = ionograma;
    entity.otros = otros;
    entity.asistencia = asistencia;
    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
