import { EntityRepository, Repository } from 'typeorm';
import { Hospital } from '../entities/hospital.entity';
@EntityRepository(Hospital)
export class HospitalRepository extends Repository<Hospital> {
  async findCombo() {
    const query = this.createQueryBuilder('hospital')
      .select([
        'hospital.id AS id',
        'hospital.nombre AS nombre',
        'municipio.id AS municipio_id',
      ])
      .leftJoin('hospital.municipio', 'municipio')
      .orderBy('hospital.nombre')
      .where('hospital.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('hospital')
      .select([
        'hospital.id AS id',
        'hospital.nombre AS nombre',
        'municipio.id AS municipio_id',
        'municipio.nombre AS municipio',
        'provincia.id AS provincia_id',
        'provincia.nombre AS provincia',
      ])
      .leftJoin('hospital.municipio', 'municipio')
      .leftJoin('municipio.provincia', 'provincia')
      .orderBy('hospital.nombre')
      .where('hospital.visible = true')
      .andWhere('lower(hospital.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
