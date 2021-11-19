import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeguimientoDto } from '../dto/create-seguimiento.dto';
import { Seguimiento } from '../entities/seguimiento.entity';
// import { UpdateSeguimientoDto } from '../dto/update-areaSalud.dto';
import { SeguimientoRepository } from '../repositories/seguimiento.repository';
import { HospitalRepository } from '../../nomencladores/repositories/hospital.repository';
import { ExpedienteRepository } from '../repositories/expediente.repository';

@Injectable()
export class SeguimientoService {
  constructor(
    private seguimientoRepository: SeguimientoRepository,
    private hospitalRepository: HospitalRepository,
    private expedienteRepository: ExpedienteRepository,
  ) {}

  async findAll(expediente_id: string) {
    return await this.seguimientoRepository.findAll(expediente_id);
  }

  async create(
    createSeguimientoDto: CreateSeguimientoDto,
  ): Promise<Seguimiento> {
    const { fecha_ingreso, fecha_alta, hospital_id, expediente_id } =
      createSeguimientoDto;
    const expediente = await this.expedienteRepository.findOne(expediente_id);
    const hospital = await this.hospitalRepository.findOne(hospital_id);
    if (!expediente) throw new NotFoundException('El expediente no existe');
    if (!hospital) throw new NotFoundException('El hospital no existe');
    const entity = new Seguimiento();
    entity.fecha_ingreso = new Date(fecha_ingreso);
    entity.fecha_alta = new Date(fecha_alta);
    entity.hospital = hospital;
    entity.expediente = expediente;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Seguimiento> {
    const entity = await this.seguimientoRepository.findOne({
      id,
      visible: true,
    });
    if (!entity) {
      throw new NotFoundException('El seguimiento no fué encontrado');
    }
    return entity;
  }

  async update(
    id: number,
    createSeguimientoDto: CreateSeguimientoDto,
  ): Promise<Seguimiento> {
    const { fecha_ingreso, fecha_alta, hospital_id } = createSeguimientoDto;
    const entity = await this.findOne(id);
    const hospital = await this.hospitalRepository.findOne(hospital_id);
    entity.fecha_ingreso = new Date(fecha_ingreso);
    entity.fecha_alta = new Date(fecha_alta);
    entity.hospital = hospital;
    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
