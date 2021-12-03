import { EntityRepository, Repository } from 'typeorm';
import { Estado } from '../entities/estado.entity';
@EntityRepository(Estado)
export class EstadoRepository extends Repository<Estado> {
  async findCombo() {
    const query = this.createQueryBuilder('estado')
      .select([
        'estado.id AS id',
        'estado.nombre AS nombre',
        'estado.descripcion AS descripcion',
      ])
      .orderBy('estado.nombre')
      .where('estado.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('estado')
      .select([
        'estado.id AS id',
        'estado.nombre AS nombre',
        'estado.descripcion AS descripcion',
      ])
      .orderBy('estado.nombre')
      .where('estado.visible = true')
      .andWhere('lower(estado.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
