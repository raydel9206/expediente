import { EntityRepository, Repository } from 'typeorm';
import { Prueba } from '../entities/prueba.entity';
@EntityRepository(Prueba)
export class PruebaRepository extends Repository<Prueba> {
  async findAll(asistencia_id: string) {
    const query = this.createQueryBuilder('prueba')
      .select([
        'prueba.id AS id',
        'prueba.fecha AS fecha',
        'prueba.tipo_prueba AS tipo_prueba',
        'prueba.tipo_muestra AS tipo_muestra',
        'prueba.tecnico AS tecnico',
        'prueba.resultado AS resultado',
        'prueba.placa_base AS placa_base',
        'prueba.orden AS orden',
        'prueba.observaciones AS observaciones',
      ])
      .leftJoin('prueba.asistencia', 'asistencia')
      .where('asistencia.id = :id', { id: asistencia_id })
      .andWhere('prueba.visible = true')
      .orderBy('prueba.fecha', 'DESC');

    return {
      rows: await query.getRawMany(),
    };
  }
}
