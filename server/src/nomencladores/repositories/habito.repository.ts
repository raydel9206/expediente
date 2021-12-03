import { EntityRepository, Repository } from 'typeorm';
import { Habito } from '../entities/habito.entity';
@EntityRepository(Habito)
export class HabitoRepository extends Repository<Habito> {
  async findCombo() {
    const query = this.createQueryBuilder('habito')
      .select(['habito.id AS id', 'habito.nombre AS nombre'])
      .orderBy('habito.nombre')
      .where('habito.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('habito')
      .select(['habito.id AS id', 'habito.nombre AS nombre'])
      .orderBy('habito.nombre')
      .where('habito.visible = true')
      .andWhere('lower(habito.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
