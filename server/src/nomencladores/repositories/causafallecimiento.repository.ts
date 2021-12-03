import { EntityRepository, Repository } from 'typeorm';
import { CausaFallecimiento } from '../entities/causafallecimiento.entity';
@EntityRepository(CausaFallecimiento)
export class CausaFallecimientoRepository extends Repository<CausaFallecimiento> {
  async findCombo() {
    const query = this.createQueryBuilder('causafallecimiento')
      .select([
        'causafallecimiento.id AS id',
        'causafallecimiento.nombre AS nombre',
        'causafallecimiento.descripcion AS descripcion',
      ])
      .orderBy('causafallecimiento.nombre')
      .where('causafallecimiento.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('causafallecimiento')
      .select([
        'causafallecimiento.id AS id',
        'causafallecimiento.nombre AS nombre',
        'causafallecimiento.descripcion AS descripcion',
      ])
      .orderBy('causafallecimiento.nombre')
      .where('causafallecimiento.visible = true')
      .andWhere('lower(causafallecimiento.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
