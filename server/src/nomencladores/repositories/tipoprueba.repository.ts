import { EntityRepository, Repository } from 'typeorm';
import { TipoPrueba } from '../entities/tipoprueba.entity';
@EntityRepository(TipoPrueba)
export class TipoPruebaRepository extends Repository<TipoPrueba> {
  async findCombo() {
    const query = this.createQueryBuilder('tipoprueba')
      .select([
        'tipoprueba.id AS id',
        'tipoprueba.nombre AS nombre',
        'tipoprueba.descripcion AS descripcion',
      ])
      .orderBy('tipoprueba.nombre')
      .where('tipoprueba.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('tipoprueba')
      .select([
        'tipoprueba.id AS id',
        'tipoprueba.nombre AS nombre',
        'tipoprueba.descripcion AS descripcion',
      ])
      .orderBy('tipoprueba.nombre')
      .where('tipoprueba.visible = true')
      .andWhere('lower(tipoprueba.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
