import { EntityRepository, Repository } from 'typeorm';
import { Sala } from '../entities/sala.entity';
@EntityRepository(Sala)
export class SalaRepository extends Repository<Sala> {
  async findAll() {
    const query = this.createQueryBuilder('sala')
      .select([
        'sala.id AS id',
        'sala.nombre AS nombre',
        'hospital.id AS hospital_id',
      ])
      .leftJoin('sala.hospital', 'hospital')
      .orderBy('sala.nombre');

    return {
      rows: await query.getRawMany(),
    };
  }
}
