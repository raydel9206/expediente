import { EntityRepository, Repository } from 'typeorm';
import { Consejo } from '../entities/consejo.entity';
@EntityRepository(Consejo)
export class ConsejoRepository extends Repository<Consejo> {
  async findCombo() {
    // console.log('a');
    const query = this.createQueryBuilder('consejo')
      .select([
        'consejo.id AS id',
        'consejo.nombre AS nombre',
        'municipio.id AS municipio_id',
      ])
      .leftJoin('consejo.municipio', 'municipio')
      .orderBy('consejo.nombre')
      .where('consejo.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('consejo')
      .select([
        'consejo.id AS id',
        'consejo.nombre AS nombre',
        'municipio.id AS municipio_id',
        'municipio.nombre AS municipio',
        'provincia.id AS provincia_id',
        'provincia.nombre AS provincia',
      ])
      .leftJoin('consejo.municipio', 'municipio')
      .leftJoin('municipio.provincia', 'provincia')
      .orderBy('consejo.nombre')
      .where('consejo.visible = true')
      .andWhere('lower(consejo.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
