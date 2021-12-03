import { EntityRepository, Repository } from 'typeorm';
import { Antecedente } from '../entities/antecedente.entity';
@EntityRepository(Antecedente)
export class AntecedenteRepository extends Repository<Antecedente> {
  async findCombo() {
    const query = this.createQueryBuilder('antecedente')
      .select([
        'antecedente.id AS id',
        'antecedente.nombre AS nombre',
        'antecedente.descripcion AS descripcion',
      ])
      .orderBy('antecedente.nombre')
      .where('antecedente.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('antecedente')
      .select([
        'antecedente.id AS id',
        'antecedente.nombre AS nombre',
        'antecedente.descripcion AS descripcion',
      ])
      .orderBy('antecedente.nombre')
      .where('antecedente.visible = true')
      .andWhere('lower(antecedente.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
