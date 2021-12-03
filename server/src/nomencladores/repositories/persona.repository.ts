import { EntityRepository, Repository } from 'typeorm';
import { Persona } from '../entities/persona.entity';
@EntityRepository(Persona)
export class PersonaRepository extends Repository<Persona> {
  async findCombo() {
    const query = this.createQueryBuilder('persona')
      .select([
        'persona.id AS id',
        'persona.ci AS ci',
        'persona.nombre AS nombre',
        'persona.apellidos AS apellidos',
      ])
      .orderBy('persona.apellidos')
      .where('persona.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('persona')
      .select([
        'persona.id AS id',
        'persona.nombre AS nombre',
        'cmf.id AS cmf_id',
        'cmf.nombre AS cmf',
        'consejo.id AS consejo_id',
        'consejo.nombre AS consejo',
        'provincia.id AS provincia_id',
        'provincia.nombre AS provincia',
      ])
      .leftJoin('persona.cmf', 'cmf')
      .leftJoin('persona.consejo', 'consejo')
      .leftJoin('municipio.provincia', 'provincia')
      .orderBy('persona.nombre')
      .where('persona.visible = true')
      .andWhere('lower(persona.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
