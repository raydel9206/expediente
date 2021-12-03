import { EntityRepository, Repository } from 'typeorm';
import { FactorRiesgo } from '../entities/factorriesgo.entity';
@EntityRepository(FactorRiesgo)
export class FactorRiesgoRepository extends Repository<FactorRiesgo> {
  async findCombo() {
    const query = this.createQueryBuilder('factorriesgo')
      .select([
        'factorriesgo.id AS id',
        'factorriesgo.nombre AS nombre',
        'factorriesgo.descripcion AS descripcion',
      ])
      .orderBy('factorriesgo.nombre')
      .where('factorriesgo.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('factorriesgo')
      .select([
        'factorriesgo.id AS id',
        'factorriesgo.nombre AS nombre',
        'factorriesgo.descripcion AS descripcion',
      ])
      .orderBy('factorriesgo.nombre')
      .where('factorriesgo.visible = true')
      .andWhere('lower(factorriesgo.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
