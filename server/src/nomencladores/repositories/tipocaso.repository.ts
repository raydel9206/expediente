import { EntityRepository, Repository } from 'typeorm';
import { TipoCaso } from '../entities/tipocaso.entity';
@EntityRepository(TipoCaso)
export class TipoCasoRepository extends Repository<TipoCaso> {
  async findCombo() {
    const query = this.createQueryBuilder('tipocaso')
      .select([
        'tipocaso.id AS id',
        'tipocaso.nombre AS nombre',
        'tipocaso.descripcion AS descripcion',
      ])
      .orderBy('tipocaso.nombre')
      .where('tipocaso.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('tipocaso')
      .select([
        'tipocaso.id AS id',
        'tipocaso.nombre AS nombre',
        'tipocaso.descripcion AS descripcion',
      ])
      .orderBy('tipocaso.nombre')
      .where('tipocaso.visible = true')
      .andWhere('lower(tipocaso.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
