import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudioDto } from '../dto/create-estudio.dto';
import { Estudio } from '../entities/estudio.entity';
import { EstudioRepository } from '../repositories/estudio.repository';
import { SeguimientoRepository } from '../repositories/seguimiento.repository';

@Injectable()
export class EstudioService {
  constructor(
    private estudioRepository: EstudioRepository,
    private seguimientoRepository: SeguimientoRepository,
  ) {}

  async findAll(seguimiento_id: string) {
    return await this.estudioRepository.findAll(seguimiento_id);
  }

  async create(createEstudioDto: CreateEstudioDto): Promise<Estudio> {
    const {
      fecha,
      tipo_prueba,
      tipo_muestra,
      tecnico,
      resultado,
      placa_base,
      orden,
      observaciones,
      seguimiento_id,
    } = createEstudioDto;
    const seguimiento = await this.seguimientoRepository.findOne(
      seguimiento_id,
    );
    const entity = new Estudio();
    entity.fecha = new Date(fecha);
    entity.tipo_prueba = tipo_prueba;
    entity.tipo_muestra = tipo_muestra;
    entity.tecnico = tecnico;
    entity.resultado = resultado;
    entity.placa_base = placa_base;
    entity.orden = orden;
    entity.observaciones = observaciones;
    entity.seguimiento = seguimiento;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Estudio> {
    const entity = await this.estudioRepository.findOne({
      relations: ['seguimiento'],
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException(
        'El estudio epidemeológico no fué encontrado',
      );
    }
    return entity;
  }

  async update(
    id: number,
    createEstudioDto: CreateEstudioDto,
  ): Promise<Estudio> {
    const entity = await this.findOne(id);
    const {
      fecha,
      tipo_prueba,
      tipo_muestra,
      tecnico,
      resultado,
      placa_base,
      orden,
      observaciones,
      seguimiento_id,
    } = createEstudioDto;
    const seguimiento = await this.seguimientoRepository.findOne(
      seguimiento_id,
    );
    entity.fecha = new Date(fecha);
    entity.tipo_prueba = tipo_prueba;
    entity.tipo_muestra = tipo_muestra;
    entity.tecnico = tecnico;
    entity.resultado = resultado;
    entity.placa_base = placa_base;
    entity.orden = orden;
    entity.observaciones = observaciones;
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
