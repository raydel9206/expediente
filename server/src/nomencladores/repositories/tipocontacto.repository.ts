import { EntityRepository, Repository } from 'typeorm';
import { TipoContacto } from '../entities/tipocontacto.entity';
@EntityRepository(TipoContacto)
export class TipoContactoRepository extends Repository<TipoContacto> {
  async findCombo() {
    const query = this.createQueryBuilder('tipocontacto')
      .select([
        'tipocontacto.id AS id',
        'tipocontacto.nombre AS nombre',
        'tipocontacto.descripcion AS descripcion',
      ])
      .orderBy('tipocontacto.nombre')
      .where('tipocontacto.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('tipocontacto')
      .select([
        'tipocontacto.id AS id',
        'tipocontacto.nombre AS nombre',
        'tipocontacto.descripcion AS descripcion',
      ])
      .orderBy('tipocontacto.nombre')
      .where('tipocontacto.visible = true')
      .andWhere('lower(tipocontacto.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
