import { EntityRepository, Repository } from 'typeorm';
import { Evento } from '../entities/evento.entity';
@EntityRepository(Evento)
export class EventoRepository extends Repository<Evento> {
  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('evento')
      .select([
        'evento.id AS id',
        'evento.denominacion as denominacion',
        'evento.modalidad as modalidad',
        'evento.cerrado as cerrado',
        'evento.fecha_activacion as fecha_activacion',
        'evento.fecha_estimada_cierre as fecha_estimada_cierre',
        'evento.fecha_ultimo_caso as fecha_ultimo_caso',
        'evento.fecha_cierre as fecha_cierre',
        'evento.tipo_brote as tipo_brote',
        'evento.tipo_transmision as tipo_transmision',
        'evento.caso_indice as caso_indice',
        'evento.caso_primario as caso_primario',
        'evento.observaciones as observaciones',
        'consejo.id AS consejo_id',
        'consejo.nombre AS consejo',
        'cmf.id AS cmf_id',
        'cmf.nombre AS cmf',
        'pais.id AS pais_id',
        'pais.nombre AS pais',
        'pais.nacionalidad AS nacionalidad',
        'procedente.id AS procedente_id',
        'procedente.nombre AS procedente',
        'municipio.id AS municipio_id',
        'municipio.nombre AS municipio',
        'provincia.id AS provincia_id',
        'provincia.nombre AS provincia',
      ])
      .leftJoin('evento.cmf', 'cmf')
      .leftJoin('evento.consejo', 'consejo')
      .leftJoin('consejo.municipio', 'municipio')
      .leftJoin('municipio.provincia', 'provincia')
      .orderBy('evento.fecha_activacion')
      .where('evento.visible = true');
    // .andWhere(
    //   'persona.nombre like :filter or persona.apellidos like :filter',
    //   { filter: `%${filter}%` },
    // );
    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }
}
