import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsistenciaDto } from '../dto/create-asistencia.dto';
import { Asistencia } from '../entities/asistencia.entity';
// import { UpdateAsistenciaDto } from '../dto/update-areaSalud.dto';
import { AsistenciaRepository } from '../repositories/asistencia.repository';
import { HospitalRepository } from '../../nomencladores/repositories/hospital.repository';
import { ExpedienteRepository } from '../repositories/expediente.repository';
import { CausaFallecimientoRepository } from '../../nomencladores/repositories/causafallecimiento.repository';

@Injectable()
export class AsistenciaService {
  constructor(
    private asistenciaRepository: AsistenciaRepository,
    private hospitalRepository: HospitalRepository,
    private expedienteRepository: ExpedienteRepository,
    private causaFallecimientoRepository: CausaFallecimientoRepository,
  ) {}

  async findAll(expediente_id: string) {
    return await this.asistenciaRepository.findAll(expediente_id);
  }

  async create(createAsistenciaDto: CreateAsistenciaDto): Promise<Asistencia> {
    const {
      fecha_ingreso,
      cama,
      // historia_clinica,
      fecha_egreso,
      // alta_clinica,
      causa_fallecimiento_id,
      hospital_id,
      expediente_id,
    } = createAsistenciaDto;
    const causa_fallecimiento = await this.causaFallecimientoRepository.findOne(
      causa_fallecimiento_id,
    );
    if (!causa_fallecimiento)
      throw new NotFoundException('La causa de fallecimiento no existe');
    const expediente = await this.expedienteRepository.findOne(expediente_id);
    if (!expediente) throw new NotFoundException('El expediente no existe');
    const hospital = await this.hospitalRepository.findOne(hospital_id);
    if (!hospital) throw new NotFoundException('El hospital no existe');
    const entity = new Asistencia();
    entity.fecha_ingreso = new Date(fecha_ingreso);
    entity.cama = cama;
    // entity.historia_clinica = historia_clinica;
    entity.fecha_egreso = new Date(fecha_egreso);
    // entity.alta_clinica = alta_clinica;
    entity.hospital = hospital;
    entity.causa_fallecimiento = causa_fallecimiento;
    entity.expediente = expediente;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Asistencia> {
    const entity = await this.asistenciaRepository.findOne({
      id,
      visible: true,
    });
    if (!entity) {
      throw new NotFoundException('El asistencia no fué encontrado');
    }
    return entity;
  }

  async update(
    id: number,
    createAsistenciaDto: CreateAsistenciaDto,
  ): Promise<Asistencia> {
    const {
      fecha_ingreso,
      cama,
      // historia_clinica,
      fecha_egreso,
      // alta_clinica,
      causa_fallecimiento_id,
      hospital_id,
      expediente_id,
    } = createAsistenciaDto;
    const causa_fallecimiento = await this.causaFallecimientoRepository.findOne(
      causa_fallecimiento_id,
    );
    if (!causa_fallecimiento)
      throw new NotFoundException('La causa de fallecimiento no existe');
    const expediente = await this.expedienteRepository.findOne(expediente_id);
    if (!expediente) throw new NotFoundException('El expediente no existe');
    const hospital = await this.hospitalRepository.findOne(hospital_id);
    if (!hospital) throw new NotFoundException('El hospital no existe');
    const entity = await this.findOne(id);
    entity.fecha_ingreso = new Date(fecha_ingreso);
    entity.cama = cama;
    // entity.historia_clinica = historia_clinica;
    entity.fecha_egreso = new Date(fecha_egreso);
    // entity.alta_clinica = alta_clinica;
    entity.hospital = hospital;
    entity.causa_fallecimiento = causa_fallecimiento;
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
