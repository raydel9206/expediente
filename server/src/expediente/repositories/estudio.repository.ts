import { EntityRepository, Repository } from 'typeorm';
import { Estudio } from '../entities/estudio.entity';
@EntityRepository(Estudio)
export class EstudioRepository extends Repository<Estudio> {
  async findAll(seguimiento_id: string) {
    const query = this.createQueryBuilder('estudio')
      .select([
        'estudio.id AS id',
        'estudio.fecha AS fecha',
        'estudio.tipo_prueba AS tipo_prueba',
        'estudio.tipo_muestra AS tipo_muestra',
        'estudio.tecnico AS tecnico',
        'estudio.resultado AS resultado',
        'estudio.placa_base AS placa_base',
        'estudio.orden AS orden',
        'estudio.observaciones AS observaciones',
      ])
      .leftJoin('estudio.seguimiento', 'seguimiento')
      .where('seguimiento.id = :id', { id: seguimiento_id })
      .andWhere('estudio.visible = true')
      .orderBy('estudio.fecha', 'DESC');

    return {
      rows: await query.getRawMany(),
    };
  }
}
