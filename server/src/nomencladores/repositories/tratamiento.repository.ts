import { EntityRepository, Repository } from 'typeorm';
import { Tratamiento } from '../entities/tratamiento.entity';
@EntityRepository(Tratamiento)
export class TratamientoRepository extends Repository<Tratamiento> {
  async findCombo() {
    const query = this.createQueryBuilder('tratamiento')
      .select(['tratamiento.id AS id', 'tratamiento.nombre AS nombre'])
      .orderBy('tratamiento.descripcion')
      .where('tratamiento.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('tratamiento')
      .select([
        'tratamiento.id AS id',
        'tratamiento.nombre AS nombre',
        'tratamiento.descripcion AS descripcion',
      ])
      .orderBy('tratamiento.descripcion')
      .where('tratamiento.visible = true')
      .andWhere('lower(tratamiento.descripcion) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }

  // async byExpediente(expediente_id: string) {
  //   const query = this.createQueryBuilder('tratamiento')
  //     .select([
  //       'tratamiento.id AS id',
  //       'tratamiento.fecha_ingreso AS fecha_ingreso',
  //       'tratamiento.fecha_alta AS fecha_alta',
  //     ])
  //     .leftJoin('tratamiento.expediente', 'expediente')
  //     .where('expediente.id = :id', { id: expediente_id })
  //     .andWhere('tratamientos.visible = true')
  //     .orderBy('tratamientos.nombre');

  //   return {
  //     rows: await query.getRawMany(),
  //   };
  // }
}
