import { EntityRepository, Repository } from 'typeorm';
import { Policlinico } from '../entities/policlinico.entity';
@EntityRepository(Policlinico)
export class PoliclinicoRepository extends Repository<Policlinico> {
  async findCombo() {
    const query = this.createQueryBuilder('policlinico')
      .select([
        'policlinico.id AS id',
        'policlinico.nombre AS nombre',
        'municipio.id AS municipio_id',
      ])
      .leftJoin('policlinico.municipio', 'municipio')
      .orderBy('policlinico.nombre')
      .where('policlinico.visible = true');

    return {
      rows: query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('policlinico')
      .select([
        'policlinico.id AS id',
        'policlinico.nombre AS nombre',
        'municipio.id AS municipio_id',
        'municipio.nombre AS municipio',
        'provincia.id AS provincia_id',
        'provincia.nombre AS provincia',
      ])
      .leftJoin('policlinico.municipio', 'municipio')
      .leftJoin('municipio.provincia', 'provincia')
      .orderBy('policlinico.nombre')
      .where('policlinico.visible = true')
      .andWhere('policlinico.nombre like :filter', { filter: `%${filter}%` });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
