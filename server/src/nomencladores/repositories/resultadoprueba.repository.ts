import { EntityRepository, Repository } from 'typeorm';
import { ResultadoPrueba } from '../entities/resultadoprueba.entity';
@EntityRepository(ResultadoPrueba)
export class ResultadoPruebaRepository extends Repository<ResultadoPrueba> {
  async findCombo() {
    const query = this.createQueryBuilder('resultadoprueba')
      .select([
        'resultadoprueba.id AS id',
        'resultadoprueba.nombre AS nombre',
        'resultadoprueba.descripcion AS descripcion',
      ])
      .orderBy('resultadoprueba.nombre')
      .where('resultadoprueba.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('resultadoprueba')
      .select([
        'resultadoprueba.id AS id',
        'resultadoprueba.nombre AS nombre',
        'resultadoprueba.descripcion AS descripcion',
      ])
      .orderBy('resultadoprueba.nombre')
      .where('resultadoprueba.visible = true')
      .andWhere('lower(resultadoprueba.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
