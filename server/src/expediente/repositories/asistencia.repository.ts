import { EntityRepository, Repository } from 'typeorm';
import { Asistencia } from '../entities/asistencia.entity';
@EntityRepository(Asistencia)
export class AsistenciaRepository extends Repository<Asistencia> {
  async findAll(expediente_id: string) {
    const query = this.createQueryBuilder('asistencia')
      .select([
        'asistencia.id AS id',
        'asistencia.fecha_ingreso AS fecha_ingreso',
        'asistencia.cama AS cama',
        // 'asistencia.historia_clinica AS historia_clinica',
        'asistencia.fecha_egreso AS fecha_egreso',
        // 'asistencia.alta_clinica AS alta_clinica',
        'causa_fallecimiento.id AS causa_fallecimiento_id',
        'causa_fallecimiento.nombre AS causa_fallecimiento',
        'hospital.id AS hospital_id',
        'hospital.nombre AS hospital',
      ])
      .leftJoin('asistencia.causa_fallecimiento', 'causa_fallecimiento')
      .leftJoin('asistencia.expediente', 'expediente')
      .leftJoin('asistencia.hospital', 'hospital')
      .where('expediente.id = :id', { id: expediente_id })
      .andWhere('asistencia.visible = true')
      .orderBy('asistencia.fecha_ingreso', 'DESC');

    return {
      rows: await query.getRawMany(),
    };
  }
}
