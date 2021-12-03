import { EntityRepository, Repository } from 'typeorm';
import { PersonalSalud } from '../entities/personalsalud.entity';
@EntityRepository(PersonalSalud)
export class PersonalSaludRepository extends Repository<PersonalSalud> {
  async findCombo() {
    const query = this.createQueryBuilder('personalsalud')
      .select([
        'personalsalud.id AS id',
        'persona.ci AS ci',
        'persona.nombre AS nombre',
        'persona.apellidos AS apellidos',
      ])
      .leftJoin('personalsalud.persona', 'persona')
      .orderBy('persona.apellidos')
      .where('personalsalud.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('personalsalud')
      .select([
        'personalsalud.id AS id',
        'personalsalud.mail AS mail',
        'personalsalud.telefono AS telefono',
        'personalsalud.numb_registro AS numb_registro',
        'persona.id AS persona_id',
        'persona.nombre AS persona_nombre',
        'persona.apellidos AS persona_apellidos',
        'catergoria_ocupacional.id AS catergoria_ocupacional_id',
        'catergoria_ocupacional.nombre AS catergoria_ocupacional_nombre',
        'especialidad.id AS especialidad_id',
        'especialidad.nombre AS especialidad_nombre',
        'centro_aislamiento.id AS centro_aislamiento_id',
        'centro_aislamiento.nombre AS centro_aislamiento_nombre',
      ])
      .leftJoin('personalsalud.persona', 'persona')
      .leftJoin(
        'personalsalud.catergoria_ocupacional',
        'catergoria_ocupacional',
      )
      .leftJoin('personalsalud.especialidad', 'especialidad')
      .leftJoin('personalsalud.centro_aislamiento', 'centro_aislamiento')
      .orderBy('persona.apellidos')
      .where('personalsalud.visible = true')
      .andWhere('lower(personalsalud.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
