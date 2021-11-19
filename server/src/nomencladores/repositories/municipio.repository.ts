import { EntityRepository, Repository } from 'typeorm';
import { Municipio } from '../entities/municipio.entity';
@EntityRepository(Municipio)
export class MunicipioRepository extends Repository<Municipio> {
  async findAll() {
    const query = this.createQueryBuilder('municipio')
      .select([
        'municipio.id AS id',
        'municipio.nombre AS nombre',
        'provincia.id AS provincia_id',
      ])
      .leftJoin('municipio.provincia', 'provincia')
      .orderBy('municipio.nro_orden');

    return {
      rows: await query.getRawMany(),
    };
  }
}
