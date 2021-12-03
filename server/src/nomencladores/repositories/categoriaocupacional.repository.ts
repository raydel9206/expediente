import { EntityRepository, Repository } from 'typeorm';
import { CategoriaOcupacional } from '../entities/categoriaocupacional.entity';
@EntityRepository(CategoriaOcupacional)
export class CategoriaOcupacionalRepository extends Repository<CategoriaOcupacional> {
  async findCombo() {
    const query = this.createQueryBuilder('categoriaocupacional')
      .select([
        'categoriaocupacional.id AS id',
        'categoriaocupacional.nombre AS nombre',
        'categoriaocupacional.descripcion AS descripcion',
      ])
      .orderBy('categoriaocupacional.nombre')
      .where('categoriaocupacional.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('categoriaocupacional')
      .select([
        'categoriaocupacional.id AS id',
        'categoriaocupacional.nombre AS nombre',
        'categoriaocupacional.descripcion AS descripcion',
      ])
      .orderBy('categoriaocupacional.nombre')
      .where('categoriaocupacional.visible = true')
      .andWhere('lower(categoriaocupacional.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
