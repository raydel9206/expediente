import { EntityRepository, Repository } from 'typeorm';
import { TratamientoBase } from '../entities/tratamientobase.entity';
@EntityRepository(TratamientoBase)
export class TratamientoBaseRepository extends Repository<TratamientoBase> {
  async findCombo() {
    const query = this.createQueryBuilder('tratamientobase')
      .select([
        'tratamientobase.id AS id',
        'tratamientobase.nombre AS nombre',
        'tratamientobase.descripcion AS descripcion',
      ])
      .orderBy('tratamientobase.nombre')
      .where('tratamientobase.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('tratamientobase')
      .select([
        'tratamientobase.id AS id',
        'tratamientobase.nombre AS nombre',
        'tratamientobase.descripcion AS descripcion',
      ])
      .orderBy('tratamientobase.nombre')
      .where('tratamientobase.visible = true')
      .andWhere('lower(tratamientobase.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
