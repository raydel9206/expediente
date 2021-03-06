import { EntityRepository, Repository } from 'typeorm';
import { Medida } from '../entities/medida.entity';
@EntityRepository(Medida)
export class MedidaRepository extends Repository<Medida> {
  // async findCombo() {
  //   const query = this.createQueryBuilder('persona')
  //     .select([
  //       'persona.id AS id',
  //       'persona.ci AS ci',
  //       'persona.nombre AS nombre',
  //       'persona.apellidos AS apellidos',
  //     ])
  //     .orderBy('persona.apellidos')
  //     .where('persona.visible = true');
  //   return {
  //     rows: await query.getRawMany(),
  //   };
  // }
  // async findAll(skip: number, take: number, filter = '') {
  //   const query = this.createQueryBuilder('persona')
  //     .select([
  //       'persona.id AS id',
  //       'persona.nombre AS nombre',
  //       'areaSalud.id AS areaSalud_id',
  //       'areaSalud.nombre AS areaSalud',
  //       'consejo.id AS consejo_id',
  //       'consejo.nombre AS consejo',
  //       'provincia.id AS provincia_id',
  //       'provincia.nombre AS provincia',
  //     ])
  //     .leftJoin('persona.areaSalud', 'areaSalud')
  //     .leftJoin('persona.consejo', 'consejo')
  //     .leftJoin('municipio.provincia', 'provincia')
  //     .orderBy('persona.nombre')
  //     .where('persona.visible = true')
  //     .andWhere('lower(persona.nombre) like :filter', {
  //       filter: `%${filter.toLowerCase()}%`,
  //     });
  //   return {
  //     rows: await query.offset(skip).limit(take).getRawMany(),
  //     count: await query.getCount(),
  //   };
  // }
}
