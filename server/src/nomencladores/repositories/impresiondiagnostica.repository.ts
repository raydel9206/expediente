import { EntityRepository, Repository } from 'typeorm';
import { ImpresionDiagnostica } from '../entities/impresiondiagnostica.entity';
@EntityRepository(ImpresionDiagnostica)
export class ImpresionDiagnosticaRepository extends Repository<ImpresionDiagnostica> {
  async findCombo() {
    const query = this.createQueryBuilder('impresiondiagnostica')
      .select([
        'impresiondiagnostica.id AS id',
        'impresiondiagnostica.nombre AS nombre',
        'impresiondiagnostica.descripcion AS descripcion',
      ])
      .orderBy('impresiondiagnostica.nombre')
      .where('impresiondiagnostica.visible = true');

    return {
      rows: await query.getRawMany(),
    };
  }

  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('impresiondiagnostica')
      .select([
        'impresiondiagnostica.id AS id',
        'impresiondiagnostica.nombre AS nombre',
        'impresiondiagnostica.descripcion AS descripcion',
      ])
      .orderBy('impresiondiagnostica.nombre')
      .where('impresiondiagnostica.visible = true')
      .andWhere('lower(impresiondiagnostica.nombre) like :filter', {
        filter: `%${filter.toLowerCase()}%`,
      });
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
