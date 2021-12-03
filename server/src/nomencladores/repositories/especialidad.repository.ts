import { EntityRepository, Repository } from 'typeorm';
import { Especialidad } from '../entities/especialidad.entity';
@EntityRepository(Especialidad)
export class EspecialidadRepository extends Repository<Especialidad> {
  async findCombo() {
    const query = this.createQueryBuilder('especialidad')
      .select([
        'especialidad.id AS id',
        'especialidad.nombre AS nombre',
        'especialidad.descripcion AS descripcion',
      ])
      .orderBy('especialidad.nombre')
      .where('especialidad.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('especialidad')
      .select([
        'especialidad.id AS id',
        'especialidad.nombre AS nombre',
        'especialidad.descripcion AS descripcion',
      ])
      .orderBy('especialidad.nombre')
      .where('especialidad.visible = true')
      .andWhere('lower(especialidad.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
