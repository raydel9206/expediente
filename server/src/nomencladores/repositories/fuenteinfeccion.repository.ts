import { EntityRepository, Repository } from 'typeorm';
import { FuenteInfeccion } from '../entities/fuenteinfeccion.entity';
@EntityRepository(FuenteInfeccion)
export class FuenteInfeccionRepository extends Repository<FuenteInfeccion> {
  async findCombo() {
    const query = this.createQueryBuilder('fuenteinfeccion')
      .select([
        'fuenteinfeccion.id AS id',
        'fuenteinfeccion.nombre AS nombre',
        'fuenteinfeccion.descripcion AS descripcion',
      ])
      .orderBy('fuenteinfeccion.nombre')
      .where('fuenteinfeccion.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('fuenteinfeccion')
      .select([
        'fuenteinfeccion.id AS id',
        'fuenteinfeccion.nombre AS nombre',
        'fuenteinfeccion.descripcion AS descripcion',
      ])
      .orderBy('fuenteinfeccion.nombre')
      .where('fuenteinfeccion.visible = true')
      .andWhere('lower(fuenteinfeccion.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
