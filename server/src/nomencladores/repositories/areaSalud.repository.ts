import { EntityRepository, Repository } from 'typeorm';
import { AreaSalud } from '../entities/areaSalud.entity';
@EntityRepository(AreaSalud)
export class AreaSaludRepository extends Repository<AreaSalud> {
  async findCombo() {
    const query = this.createQueryBuilder('areaSalud')
      .select([
        'areaSalud.id AS id',
        'areaSalud.nombre AS nombre',
        'policlinico.id AS policlinico_id',
      ])
      .leftJoin('areaSalud.policlinico', 'policlinico')
      .orderBy('areaSalud.nombre')
      .where('areaSalud.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('areaSalud')
      .select([
        'areaSalud.id AS id',
        'areaSalud.nombre AS nombre',
        'policlinico.id AS policlinico_id',
        'policlinico.nombre AS policlinico',
        'municipio.id AS municipio_id',
        'municipio.nombre AS municipio',
        'provincia.id AS provincia_id',
        'provincia.nombre AS provincia',
      ])
      .leftJoin('areaSalud.policlinico', 'policlinico')
      .leftJoin('policlinico.municipio', 'municipio')
      .leftJoin('municipio.provincia', 'provincia')
      .orderBy('areaSalud.nombre')
      .where('areaSalud.visible = true')
      .andWhere('lower(areaSalud.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
