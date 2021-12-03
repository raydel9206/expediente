import { EntityRepository, Repository, getManager } from 'typeorm';
import { Expediente } from '../entities/expediente.entity';
@EntityRepository(Expediente)
export class ExpedienteRepository extends Repository<Expediente> {
  async findAll(skip: number, take: number, filter = '') {
    const query = this.createQueryBuilder('expediente')
      .select([
        'expediente.id AS id',
        'expediente.fecha_sintomas as fecha_sintomas',
        'expediente.arribado as arribado',
        'expediente.fecha_arribo as fecha_arribo',
        'expediente.lugar_estancia as lugar_estancia',
        'expediente.tipo_centro_remite as tipo_centro_remite',
        'expediente.centro_remite as centro_remite',
        'expediente.iscontacto as iscontacto',
        'expediente.lugar_contacto as lugar_contacto',
        'expediente.tipo_contacto as tipo_contacto',
        'expediente.fecha_contacto as fecha_contacto',
        'expediente.otros_sintomas as otros_sintomas',
        'persona.id AS persona_id',
        'persona.ci AS persona_ci',
        'persona.nombre AS persona_nombre',
        'persona.apellidos AS persona_apellidos',
        'persona.edad AS persona_edad',
        'persona.sexo AS persona_sexo',
        'persona.direccion AS persona_direccion',
        'persona.ocupacion AS persona_ocupacion',
        'persona.centro AS persona_centro',
        'cmf.id AS cmf_id',
        'cmf.nombre AS cmf',
        'pais.id AS pais_id',
        'pais.nombre AS pais',
        'pais.nacionalidad AS nacionalidad',
        'procedente.id AS procedente_id',
        'procedente.nombre AS procedente',
        'policlinico.id AS policlinico_id',
        'policlinico.nombre AS policlinico',
        'consejo.id AS consejo_id',
        'consejo.nombre AS consejo',
        'municipio.id AS municipio_id',
        'municipio.nombre AS municipio',
        'provincia.id AS provincia_id',
        'provincia.nombre AS provincia',
        'fuente_infeccion.id AS fuente_infeccion_id',
        'fuente_infeccion.nombre AS fuente_infeccion',
        'tipo_caso.id AS tipo_caso_id',
        'tipo_caso.nombre AS tipo_caso',
        'metodo_hallazgo.id AS metodo_hallazgo_id',
        'metodo_hallazgo.nombre AS metodo_hallazgo',
        'factor_riesgo.id AS factor_riesgo_id',
        'factor_riesgo.nombre AS factor_riesgo',
        'impresion_diagnostica.id AS impresion_diagnostica_id',
        'impresion_diagnostica.nombre AS impresion_diagnostica',
      ])
      .leftJoin('expediente.persona', 'persona')
      .leftJoin('persona.cmf', 'cmf')
      .leftJoin('cmf.policlinico', 'policlinico')
      .leftJoin('persona.consejo', 'consejo')
      .leftJoin('policlinico.municipio', 'municipio')
      .leftJoin('municipio.provincia', 'provincia')
      .leftJoin('persona.pais', 'pais')
      .leftJoin('expediente.procedente', 'procedente')
      .leftJoin('expediente.fuente_infeccion', 'fuente_infeccion')
      .leftJoin('expediente.tipo_caso', 'tipo_caso')
      .leftJoin('expediente.metodo_hallazgo', 'metodo_hallazgo')
      .leftJoin('expediente.factor_riesgo', 'factor_riesgo')
      .leftJoin('expediente.impresion_diagnostica', 'impresion_diagnostica')
      .orderBy('expediente.fecha_registro')
      .where('expediente.visible = true')
      .andWhere(
        '(persona.nombre like :filter or persona.apellidos like :filter or persona.ci like :filter)',
        { filter: `%${filter}%` },
      );

    return {
      rows: await query.offset(skip).limit(take).getRawMany(),
      count: await query.getCount(),
    };
  }

  async findContactos(
    skip: number,
    take: number,
    expediente_id: number,
    filter = '',
  ) {
    // const entityManager = getManager();
    // const rawData = await entityManager.query(`SELECT * FROM persona p
    // JOIN expediente_contactos_persona ecp ON ecp.persona_id = p.id`);
    // return rawData;
    const query = this.createQueryBuilder('expediente')
      .select('contacto.id')
      .leftJoinAndSelect('expediente.contactos', 'contacto')
      //   const query = "select * from expediente_contactos_persona ecp join expediente e on ecp.expedienteid = e.id where e.id = 1";
      //   return await connection.query
      // const query = this.createQueryBuilder('expediente')
      // .select()
      // .leftJoin('expediente.contactos', 'contactos')
      // .leftJoin('persona.cmf', 'cmf')
      // .leftJoin('cmf.policlinico', 'policlinico')
      // .leftJoin('policlinico.municipio', 'municipio')
      // .leftJoin('municipio.provincia', 'provincia')
      // .leftJoin('persona.pais', 'pais')
      // .leftJoin('expediente.procedente', 'procedente')
      // .orderBy('expediente.fecha_registro')
      .where('expediente.id = true');
    // .andWhere(
    //   'persona.nombre like :filter or persona.apellidos like :filter or persona.ci like :filter',
    //   { filter: `%${filter}%` },
    // );

    // console.log(query.getSql());
    return {
      // rows: await query.offset(skip).limit(take).getRawMany(),
      rows: await query.getRawMany(),
      count: await query.getCount(),
    };
  }
}
