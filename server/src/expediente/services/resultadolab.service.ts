import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultadoLabDto } from '../dto/create-resultadolab.dto';
import { ResultadoLab } from '../entities/resultadolab.entity';
import { ResultadoLabRepository } from '../repositories/resultadolab.repository';
import { SeguimientoRepository } from '../repositories/seguimiento.repository';

@Injectable()
export class ResultadoLabService {
  constructor(
    private resultadoLabRepository: ResultadoLabRepository,
    private seguimientoRepository: SeguimientoRepository,
  ) {}

  async findAll(seguimiento_id: string) {
    return await this.resultadoLabRepository.findAll(seguimiento_id);
  }

  async create(
    createResultadoLabDto: CreateResultadoLabDto,
  ): Promise<ResultadoLab> {
    const { fecha, hemograma, gasometria, ionograma, otros, seguimiento_id } =
      createResultadoLabDto;
    const seguimiento = await this.seguimientoRepository.findOne(
      seguimiento_id,
    );
    const entity = new ResultadoLab();
    entity.fecha = fecha;
    entity.hemograma = hemograma;
    entity.gasometria = gasometria;
    entity.ionograma = ionograma;
    entity.otros = otros;
    entity.seguimiento = seguimiento;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<ResultadoLab> {
    const entity = await this.resultadoLabRepository.findOne({
      relations: ['seguimiento'],
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
    const { fecha, hemograma, gasometria, ionograma, otros, seguimiento_id } =
      createResultadoLabDto;
    const seguimiento = await this.seguimientoRepository.findOne(
      seguimiento_id,
    );
    entity.fecha = fecha;
    entity.hemograma = hemograma;
    entity.gasometria = gasometria;
    entity.ionograma = ionograma;
    entity.otros = otros;
    entity.seguimiento = seguimiento;
    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
