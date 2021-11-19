import { EntityRepository, Repository } from 'typeorm';
import { ResultadoLab } from '../entities/resultadolab.entity';
@EntityRepository(ResultadoLab)
export class ResultadoLabRepository extends Repository<ResultadoLab> {
  async findAll(seguimiento_id: string) {
    const query = this.createQueryBuilder('resultadolab')
      .select([
        'resultadolab.id AS id',
        'resultadolab.fecha AS fecha',
        'resultadolab.hemograma AS hemograma',
        'resultadolab.gasometria AS gasometria',
        'resultadolab.ionograma AS ionograma',
        'resultadolab.otros AS otros',
      ])
      .leftJoin('resultadolab.seguimiento', 'seguimiento')
      .where('seguimiento.id = :id', { id: seguimiento_id })
      .andWhere('resultadolab.visible = true')
      .orderBy('resultadolab.fecha', 'DESC');

    return {
      rows: await query.getRawMany(),
    };
  }
}
