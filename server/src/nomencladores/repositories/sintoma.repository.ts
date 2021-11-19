import { EntityRepository, Repository } from 'typeorm';
import { Sintoma } from '../entities/sintoma.entity';
@EntityRepository(Sintoma)
export class SintomaRepository extends Repository<Sintoma> {
  async findCombo() {
    const query = this.createQueryBuilder('sintoma')
      .select([
        'sintoma.id AS id',
        // 'sintoma.nombre AS nombre',
        'sintoma.descripcion AS descripcion',
      ])
      .orderBy('sintoma.descripcion')
      .where('sintoma.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('sintoma')
      .select([
        'sintoma.id AS id',
        // 'sintoma.nombre AS nombre',
        'sintoma.descripcion AS descripcion',
      ])
      .orderBy('sintoma.descripcion')
      .where('sintoma.visible = true')
      .andWhere('lower(sintoma.descripcion) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }

  // async byExpediente(expediente_id: string) {
  //   const query = this.createQueryBuilder('sintoma')
  //     .select([
  //       'sintoma.id AS id',
  //       'sintoma.fecha_ingreso AS fecha_ingreso',
  //       'sintoma.fecha_alta AS fecha_alta',
  //     ])
  //     .leftJoin('sintoma.expediente', 'expediente')
  //     .where('expediente.id = :id', { id: expediente_id })
  //     .andWhere('sintomas.visible = true')
  //     .orderBy('sintomas.nombre');

  //   return {
  //     rows: await query.getRawMany(),
  //   };
  // }
}
