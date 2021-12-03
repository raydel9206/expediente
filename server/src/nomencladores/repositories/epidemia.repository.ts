import { EntityRepository, Repository } from 'typeorm';
import { Epidemia } from '../entities/epidemia.entity';
@EntityRepository(Epidemia)
export class EpidemiaRepository extends Repository<Epidemia> {
  async findCombo() {
    const query = this.createQueryBuilder('epidemia')
      .select([
        'epidemia.id AS id',
        'epidemia.nombre AS nombre',
        'epidemia.descripcion AS descripcion',
      ])
      .orderBy('epidemia.nombre')
      .where('epidemia.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('epidemia')
      .select([
        'epidemia.id AS id',
        'epidemia.nombre AS nombre',
        'epidemia.descripcion AS descripcion',
      ])
      .orderBy('epidemia.nombre')
      .where('epidemia.visible = true')
      .andWhere('lower(epidemia.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
