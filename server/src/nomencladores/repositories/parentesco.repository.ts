import { EntityRepository, Repository } from 'typeorm';
import { Parentesco } from '../entities/parentesco.entity';
@EntityRepository(Parentesco)
export class ParentescoRepository extends Repository<Parentesco> {
  async findCombo() {
    const query = this.createQueryBuilder('parentesco')
      .select([
        'parentesco.id AS id',
        'parentesco.nombre AS nombre',
        'parentesco.descripcion AS descripcion',
      ])
      .orderBy('parentesco.nombre')
      .where('parentesco.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('parentesco')
      .select([
        'parentesco.id AS id',
        'parentesco.nombre AS nombre',
        'parentesco.descripcion AS descripcion',
      ])
      .orderBy('parentesco.nombre')
      .where('parentesco.visible = true')
      .andWhere('lower(parentesco.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
