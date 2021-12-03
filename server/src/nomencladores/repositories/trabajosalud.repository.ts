import { EntityRepository, Repository } from 'typeorm';
import { TrabajoSalud } from '../entities/trabajosalud.entity';
@EntityRepository(TrabajoSalud)
export class TrabajoSaludRepository extends Repository<TrabajoSalud> {
  async findCombo() {
    const query = this.createQueryBuilder('trabajosalud')
      .select([
        'trabajosalud.id AS id',
        'trabajosalud.nombre AS nombre',
        'trabajosalud.descripcion AS descripcion',
      ])
      .orderBy('trabajosalud.nombre')
      .where('trabajosalud.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('trabajosalud')
      .select([
        'trabajosalud.id AS id',
        'trabajosalud.nombre AS nombre',
        'trabajosalud.descripcion AS descripcion',
      ])
      .orderBy('trabajosalud.nombre')
      .where('trabajosalud.visible = true')
      .andWhere('lower(trabajosalud.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
