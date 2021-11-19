import { EntityRepository, Repository } from 'typeorm';
import { Provincia } from '../entities/provincia.entity';
@EntityRepository(Provincia)
export class ProvinciaRepository extends Repository<Provincia> {
  async findAll() {
    const query = this.createQueryBuilder('provincia')
      .select(['provincia.id AS id', 'provincia.nombre AS nombre'])
      .orderBy('provincia.nro_orden');

    return {
      rows: await query.getRawMany(),
    };
  }
}
