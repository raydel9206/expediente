import { EntityRepository, Repository } from 'typeorm';
import { MetodoHallazgo } from '../entities/metodohallazgo.entity';
@EntityRepository(MetodoHallazgo)
export class MetodoHallazgoRepository extends Repository<MetodoHallazgo> {
  async findCombo() {
    const query = this.createQueryBuilder('metodohallazgo')
      .select([
        'metodohallazgo.id AS id',
        'metodohallazgo.nombre AS nombre',
        'metodohallazgo.descripcion AS descripcion',
      ])
      .orderBy('metodohallazgo.nombre')
      .where('metodohallazgo.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('metodohallazgo')
      .select([
        'metodohallazgo.id AS id',
        'metodohallazgo.nombre AS nombre',
        'metodohallazgo.descripcion AS descripcion',
      ])
      .orderBy('metodohallazgo.nombre')
      .where('metodohallazgo.visible = true')
      .andWhere('lower(metodohallazgo.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
