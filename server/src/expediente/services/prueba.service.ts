import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePruebaDto } from '../dto/create-prueba.dto';
import { Prueba } from '../entities/prueba.entity';
import { PruebaRepository } from '../repositories/prueba.repository';
import { AsistenciaRepository } from '../repositories/asistencia.repository';

@Injectable()
export class PruebaService {
  constructor(
    private pruebaRepository: PruebaRepository,
    private asistenciaRepository: AsistenciaRepository,
  ) {}

  async findAll(asistencia_id: string) {
    return await this.pruebaRepository.findAll(asistencia_id);
  }

  async create(createPruebaDto: CreatePruebaDto): Promise<Prueba> {
    const {
      fecha,
      tipo_prueba,
      tipo_muestra,
      tecnico,
      resultado,
      placa_base,
      orden,
      observaciones,
      asistencia_id,
    } = createPruebaDto;
    const asistencia = await this.asistenciaRepository.findOne(asistencia_id);
    const entity = new Prueba();
    entity.fecha = new Date(fecha);
    entity.tipo_prueba = tipo_prueba;
    entity.tipo_muestra = tipo_muestra;
    entity.tecnico = tecnico;
    entity.resultado = resultado;
    entity.placa_base = placa_base;
    entity.orden = orden;
    entity.observaciones = observaciones;
    entity.asistencia = asistencia;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Prueba> {
    const entity = await this.pruebaRepository.findOne({
      relations: ['asistencia'],
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El prueba epidemeológico no fué encontrado');
    }
    return entity;
  }

  async update(id: number, createPruebaDto: CreatePruebaDto): Promise<Prueba> {
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
      asistencia_id,
    } = createPruebaDto;
    const asistencia = await this.asistenciaRepository.findOne(asistencia_id);
    entity.fecha = new Date(fecha);
    entity.tipo_prueba = tipo_prueba;
    entity.tipo_muestra = tipo_muestra;
    entity.tecnico = tecnico;
    entity.resultado = resultado;
    entity.placa_base = placa_base;
    entity.orden = orden;
    entity.observaciones = observaciones;
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
