import { EntityRepository, Repository } from 'typeorm';
import { Traslado } from '../entities/traslado.entity';
@EntityRepository(Traslado)
export class TrasladoRepository extends Repository<Traslado> {
  async findAll(expediente_id: string) {
    const query = this.createQueryBuilder('traslado')
      .select([
        'traslado.id AS id',
        'traslado.fecha AS fecha',
        'traslado.agente AS agente',
        'traslado.demanda AS demanda',
      ])
      .leftJoin('traslado.expediente', 'expediente')
      .where('expediente.id = :id', { id: expediente_id })
      .andWhere('traslado.visible = true')
      .orderBy('traslado.fecha', 'DESC');

    return {
      rows: await query.getRawMany(),
    };
  }
}
