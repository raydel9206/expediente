import { EntityRepository, Repository } from 'typeorm';
import { Seguimiento } from '../entities/seguimiento.entity';
@EntityRepository(Seguimiento)
export class SeguimientoRepository extends Repository<Seguimiento> {
  async findAll(expediente_id: string) {
    const query = this.createQueryBuilder('seguimiento')
      .select([
        'seguimiento.id AS id',
        'seguimiento.fecha_ingreso AS fecha_ingreso',
        'seguimiento.fecha_alta AS fecha_alta',
        'hospital.nombre AS hospital',
      ])
      .leftJoin('seguimiento.expediente', 'expediente')
      .leftJoin('seguimiento.hospital', 'hospital')
      .where('expediente.id = :id', { id: expediente_id })
      .andWhere('seguimiento.visible = true')
      .orderBy('seguimiento.fecha_ingreso', 'DESC');

    return {
      rows: await query.getRawMany(),
    };
  }
}
