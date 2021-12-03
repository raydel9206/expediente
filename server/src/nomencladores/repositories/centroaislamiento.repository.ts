import { EntityRepository, Repository } from 'typeorm';
import { CentroAislamiento } from '../entities/centroaislamiento.entity';
@EntityRepository(CentroAislamiento)
export class CentroAislamientoRepository extends Repository<CentroAislamiento> {
  async findCombo() {
    const query = this.createQueryBuilder('centroaislamiento')
      .select([
        'centroaislamiento.id AS id',
        'centroaislamiento.nombre AS nombre',
        'municipio.id AS municipio_id',
      ])
      .leftJoin('centroaislamiento.municipio', 'municipio')
      .orderBy('centroaislamiento.nombre')
      .where('centroaislamiento.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('centroaislamiento')
      .select([
        'centroaislamiento.id AS id',
        'centroaislamiento.nombre AS nombre',
        'centroaislamiento.disponibilidad AS disponibilidad',
        'municipio.id AS municipio_id',
        'municipio.nombre AS municipio',
        'provincia.id AS provincia_id',
        'provincia.nombre AS provincia',
      ])
      .leftJoin('centroaislamiento.municipio', 'municipio')
      .leftJoin('municipio.provincia', 'provincia')
      .orderBy('centroaislamiento.nombre')
      .where('centroaislamiento.visible = true')
      .andWhere('lower(centroaislamiento.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
