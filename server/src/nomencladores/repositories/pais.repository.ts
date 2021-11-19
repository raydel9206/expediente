import { EntityRepository, Repository } from 'typeorm';
import { Pais } from '../entities/pais.entity';
@EntityRepository(Pais)
export class PaisRepository extends Repository<Pais> {
  async findCombo() {
    const query = this.createQueryBuilder('pais')
      .select([
        'pais.id AS id',
        'pais.nombre AS nombre',
        'pais.nacionalidad AS nacionalidad',
      ])
      .orderBy('pais.nombre')
      .where('pais.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('pais')
      .select([
        'pais.id AS id',
        'pais.nombre AS nombre',
        'pais.nacionalidad AS nacionalidad',
      ])
      .orderBy('pais.nombre')
      .where('pais.visible = true')
      .andWhere('lower(pais.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
