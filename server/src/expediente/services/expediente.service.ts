import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpedienteDto } from '../dto/create-expediente.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';
import { Expediente } from '../entities/expediente.entity';
import { AntecedenteRepository } from '../../nomencladores/repositories/antecedente.repository';
import { AreaSaludRepository } from '../../nomencladores/repositories/areaSalud.repository';
import { ExpedienteRepository } from '../repositories/expediente.repository';
import { PaisRepository } from '../../nomencladores/repositories/pais.repository';
import { PersonaRepository } from '../../nomencladores/repositories/persona.repository';
import { Persona } from 'src/nomencladores/entities/persona.entity';
import { ConsejoRepository } from 'src/nomencladores/repositories/consejo.repository';
import { SintomaRepository } from 'src/nomencladores/repositories/sintoma.repository';
import { EpidemiaRepository } from 'src/nomencladores/repositories/epidemia.repository';
import { EstadoRepository } from 'src/nomencladores/repositories/estado.repository';
import { FuenteInfeccionRepository } from 'src/nomencladores/repositories/fuenteinfeccion.repository';
import { TipoCasoRepository } from 'src/nomencladores/repositories/tipocaso.repository';
import { MetodoHallazgoRepository } from 'src/nomencladores/repositories/metodohallazgo.repository';
import { FactorRiesgoRepository } from 'src/nomencladores/repositories/factorriesgo.repository';
import { ImpresionDiagnosticaRepository } from 'src/nomencladores/repositories/impresiondiagnostica.repository';
import { HabitoRepository } from 'src/nomencladores/repositories/habito.repository';
import { TrabajoSalud } from 'src/nomencladores/entities/trabajosalud.entity';
import { query } from 'express';

@Injectable()
export class ExpedienteService {
  constructor(
    private expedienteRepository: ExpedienteRepository,
    private personaRepository: PersonaRepository,
    private paisRepository: PaisRepository,
    private cmfRepository: AreaSaludRepository,
    private antecedenteRepository: AntecedenteRepository,
    private consejoRepository: ConsejoRepository,
    private sintomaRepository: SintomaRepository,
    private epidemiaRepository: EpidemiaRepository,
    private estadoRepository: EstadoRepository,
    private fuenteInfeccionRepository: FuenteInfeccionRepository,
    private tipoCasoRepository: TipoCasoRepository,
    private metodoHallazgoRepository: MetodoHallazgoRepository,
    private factorRiesgoRepository: FactorRiesgoRepository,
    private impresionDiagnosticaRepository: ImpresionDiagnosticaRepository,
    private habitoRepository: HabitoRepository,
  ) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { keyword, take, skip } = findPaginationDto;
    return await this.expedienteRepository.findAll(skip, take, keyword);
  }

  async getContactos(query) {
    const { skip, take, filter, expediente_id } = query;
    // return await this.expedienteRepository.getContactos(
    //   skip,
    //   take,
    //   filter,
    //   expediente_id,
    // );
    const entity = await this.expedienteRepository.findOne({
      where: { id: parseInt(expediente_id), visible: true },
      relations: ['contactos'],
    });
    if (!entity) {
      throw new NotFoundException('El expediente no fué encontrado');
    }
    return {
      rows: entity.contactos,
    };
  }

  async getSintomas(expediente_id: string) {
    const id = parseInt(expediente_id);
    const entity = await this.expedienteRepository.findOne({
      where: {
        id: id,
        visible: true,
      },
      relations: ['sintomas'],
    });
    if (!entity) {
      throw new NotFoundException('El expediente no fué encontrado');
    }

    return {
      rows: entity.sintomas,
    };
  }

  async getTratamientos(expediente_id: string) {
    const id = parseInt(expediente_id);
    const entity = await this.expedienteRepository.findOne({
      where: {
        id: id,
        visible: true,
      },
      relations: ['tratamientos'],
    });
    if (!entity) {
      throw new NotFoundException('El expediente no fué encontrado');
    }

    return {
      rows: entity.tratamientos,
    };
  }

  async getHabitos(expediente_id: string) {
    const id = parseInt(expediente_id);
    const entity = await this.expedienteRepository.findOne({
      where: {
        id: id,
        visible: true,
      },
      relations: ['habitos'],
    });
    if (!entity) {
      throw new NotFoundException('El expediente no fué encontrado');
    }

    return {
      rows: entity.habitos,
    };
  }

  async create(createExpedienteDto: CreateExpedienteDto): Promise<Expediente> {
    const {
      persona_ci,
      persona_nombre,
      persona_apellidos,
      persona_edad,
      persona_sexo,
      persona_piel,
      persona_centro,
      persona_direccion,
      persona_ocupacion,
      telefono_centro,
      direccion_centro,
      fecha_sospecha,
      fecha_sintomas,
      arribado,
      fecha_arribo,
      lugar_estancia,
      tipo_centro_remite,
      centro_remite,
      iscontacto,
      lugar_contacto,
      tipo_contacto,
      fecha_contacto,
      otros_sintomas,
      fecha_inicio_aislamiento,
      fecha_fin_aislamiento,
      fin_aislamiento,
      alta_epidemiologica,
      fecha_inicio_vigilancia,
      fecha_fin_vigilancia,
      asintomatico,
      sint_post_confirm,
      consecutivo_nacional,
      numero_provincial,
      observaciones,
      trabajador_salud,
      pais_id,
      procede_id,
      cmf_id,
      consejo_id,
      epidemia_id,
      estado_id,
      fuente_infeccion_id,
      tipo_caso_id,
      metodo_hallazgo_id,
      factor_riesgo_id,
      impresion_diagnostica_id,
      sintomas,
      antecedentes,
      habitos,
    } = createExpedienteDto;

    const pais = await this.paisRepository.findOne(pais_id);
    if (!pais) {
      throw new NotFoundException('El pais no fué encontrado');
    }

    // let procede = null;
    // if (procede_id) {
    const procedente = await this.paisRepository.findOne(procede_id);
    if (!procedente) {
      throw new NotFoundException('El pais no fué encontrado');
    }
    // }

    const cmf = await this.cmfRepository.findOne(cmf_id);
    if (!cmf) {
      throw new NotFoundException('La área de salud no fué encontrada');
    }
    const consejo = await this.consejoRepository.findOne(consejo_id);
    if (!consejo) {
      throw new NotFoundException('El consejo no fué encontrado');
    }

    const epidemia = await this.epidemiaRepository.findOne(epidemia_id);
    if (!epidemia) {
      throw new NotFoundException('La epidemia no fué encontrada');
    }

    const estado = await this.estadoRepository.findOne(estado_id);
    if (!estado) {
      throw new NotFoundException('El estado no fué encontrado');
    }
    const fuente_infeccion = await this.fuenteInfeccionRepository.findOne(
      fuente_infeccion_id,
    );
    if (!fuente_infeccion) {
      throw new NotFoundException('La fuente de infección no fué encontrada');
    }

    const tipo_caso = await this.tipoCasoRepository.findOne(tipo_caso_id);
    if (!tipo_caso) {
      throw new NotFoundException('El tipo de caso no fué encontrado');
    }

    const metodo_hallazgo = await this.metodoHallazgoRepository.findOne(
      metodo_hallazgo_id,
    );
    if (!metodo_hallazgo) {
      throw new NotFoundException('El método de hallazgo no fué encontrado');
    }

    const factor_riesgo = await this.factorRiesgoRepository.findOne(
      factor_riesgo_id,
    );
    if (!factor_riesgo) {
      throw new NotFoundException('El factor de riesgo no fué encontrado');
    }

    const impresion_diagnostica =
      await this.impresionDiagnosticaRepository.findOne(
        impresion_diagnostica_id,
      );
    if (!impresion_diagnostica) {
      throw new NotFoundException('La impresión diagnóstica no fué encontrada');
    }

    let persona = await this.personaRepository.findOne({
      ci: persona_ci,
      visible: true,
    });
    if (!persona) {
      persona = new Persona();
      persona.ci = persona_ci;
      persona.nombre = persona_nombre;
      persona.apellidos = persona_apellidos;
      persona.edad = parseInt(persona_edad);
      persona.sexo = persona_sexo;
      persona.color_piel = persona_piel;
      persona.direccion = persona_direccion;
      persona.ocupacion = persona_ocupacion;
      persona.centro = persona_centro;
      persona.telefono_centro = telefono_centro;
      persona.direccion_centro = direccion_centro;
      persona.cmf = cmf;
      persona.consejo = consejo;
      persona.pais = pais;
      await persona.save();
    } else {
      persona.ci = persona_ci;
      persona.nombre = persona_nombre;
      persona.apellidos = persona_apellidos;
      persona.edad = parseInt(persona_edad);
      persona.sexo = persona_sexo;
      persona.color_piel = persona_piel;
      persona.direccion = persona_direccion;
      persona.ocupacion = persona_ocupacion;
      persona.centro = persona_centro;
      persona.telefono_centro = telefono_centro;
      persona.direccion_centro = direccion_centro;
      persona.cmf = cmf;
      persona.consejo = consejo;
      persona.pais = pais;
      await persona.save();
    }
    const entity = new Expediente();
    entity.fecha_registro = new Date();
    entity.fecha_sospecha = new Date(fecha_sospecha);
    entity.fecha_sintomas = new Date(fecha_sintomas);
    entity.arribado = arribado == 'true';
    entity.fecha_arribo = fecha_arribo ? new Date(fecha_arribo) : null;
    entity.lugar_estancia = lugar_estancia;
    entity.tipo_centro_remite = tipo_centro_remite;
    entity.centro_remite = centro_remite;
    entity.iscontacto = iscontacto == 'true';
    entity.lugar_contacto = lugar_contacto;
    entity.tipo_contacto = tipo_contacto;
    entity.fecha_contacto = fecha_contacto ? new Date(fecha_contacto) : null;
    entity.otros_sintomas = otros_sintomas;
    entity.fecha_inicio_aislamiento = new Date(fecha_inicio_aislamiento);
    entity.fecha_fin_aislamiento = new Date(fecha_fin_aislamiento);
    entity.fin_aislamiento = fin_aislamiento;
    entity.fecha_inicio_vigilancia = new Date(fecha_inicio_vigilancia);
    entity.fecha_fin_vigilancia = new Date(fecha_fin_vigilancia);
    entity.alta_epidemiologica = alta_epidemiologica;
    entity.asintomatico = asintomatico == 'true';
    entity.sint_post_confirm = sint_post_confirm == 'true';
    entity.consecutivo_nacional = consecutivo_nacional;
    entity.numero_provincial = numero_provincial;
    entity.observaciones = observaciones;
    (entity.trabajador_salud = trabajador_salud),
      (entity.procedente = procedente);
    entity.epidemia = epidemia;
    entity.estado = estado;
    entity.fuente_infeccion = fuente_infeccion;
    entity.tipo_caso = tipo_caso;
    entity.metodo_hallazgo = metodo_hallazgo;
    entity.factor_riesgo = factor_riesgo;
    entity.impresion_diagnostica = impresion_diagnostica;
    entity.sintomas = [];

    if (sintomas)
      for (const iterator of sintomas) {
        const sintoma = await this.sintomaRepository.findOne({
          id: iterator,
          visible: true,
        });
        if (!sintoma) {
          throw new NotFoundException('El Síntoma no fué encontrado');
        }

        entity.sintomas.push(sintoma);
      }

    entity.habitos = [];
    if (habitos)
      for (const iterator of habitos) {
        const habito = await this.habitoRepository.findOne({
          id: iterator,
          visible: true,
        });
        if (!habito) {
          throw new NotFoundException('El hábito no fué encontrado');
        }

        entity.habitos.push(habito);
      }

    persona.antecedentes = [];
    if (antecedentes)
      for (const iterator of antecedentes) {
        const antecedente = await this.antecedenteRepository.findOne({
          id: iterator,
          visible: true,
        });
        if (!antecedente) {
          throw new NotFoundException('El antecedente no fué encontrado');
        }

        persona.antecedentes.push(antecedente);
      }
    await persona.save();

    entity.persona = persona;

    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Expediente> {
    const entity = await this.expedienteRepository.findOne({
      id,
      visible: true,
    });
    if (!entity) {
      throw new NotFoundException('El expediente no fué encontrado');
    }
    return entity;
  }

  async update(
    id: number,
    createExpedienteDto: CreateExpedienteDto,
  ): Promise<Expediente> {
    const {
      persona_ci,
      persona_nombre,
      persona_apellidos,
      persona_edad,
      persona_sexo,
      persona_piel,
      persona_centro,
      telefono_centro,
      direccion_centro,
      persona_direccion,
      persona_ocupacion,
      fecha_sospecha,
      fecha_sintomas,
      arribado,
      fecha_arribo,
      lugar_estancia,
      tipo_centro_remite,
      centro_remite,
      iscontacto,
      lugar_contacto,
      tipo_contacto,
      fecha_contacto,
      otros_sintomas,
      fecha_inicio_aislamiento,
      fecha_fin_aislamiento,
      fin_aislamiento,
      fecha_inicio_vigilancia,
      fecha_fin_vigilancia,
      alta_epidemiologica,
      asintomatico,
      sint_post_confirm,
      consecutivo_nacional,
      numero_provincial,
      observaciones,
      trabajador_salud,
      pais_id,
      procede_id,
      cmf_id,
      consejo_id,
      epidemia_id,
      estado_id,
      fuente_infeccion_id,
      tipo_caso_id,
      metodo_hallazgo_id,
      factor_riesgo_id,
      impresion_diagnostica_id,
      sintomas,
      antecedentes,
      habitos,
    } = createExpedienteDto;
    const entity = await this.expedienteRepository.findOne({
      where: { id: id, visible: true },
      relations: ['contactos'],
    });

    const pais = await this.paisRepository.findOne(pais_id);
    if (!pais) {
      throw new NotFoundException('El pais no fué encontrado');
    }

    const procedente = await this.paisRepository.findOne(procede_id);
    if (!procedente) {
      throw new NotFoundException('El pais no fué encontrado');
    }
    const cmf = await this.cmfRepository.findOne(cmf_id);
    if (!cmf) {
      throw new NotFoundException('La área de salud no fué encontrada');
    }
    const consejo = await this.consejoRepository.findOne(consejo_id);
    if (!consejo) {
      throw new NotFoundException('El consejo no fué encontrado');
    }

    const epidemia = await this.epidemiaRepository.findOne(epidemia_id);
    if (!epidemia) {
      throw new NotFoundException('La epidemia no fué encontrada');
    }

    const estado = await this.estadoRepository.findOne(estado_id);
    if (!estado) {
      throw new NotFoundException('El estado no fué encontrada=o');
    }

    const fuente_infeccion = await this.fuenteInfeccionRepository.findOne(
      fuente_infeccion_id,
    );
    if (!fuente_infeccion) {
      throw new NotFoundException('La fuente de infección no fué encontrada');
    }

    const tipo_caso = await this.tipoCasoRepository.findOne(tipo_caso_id);
    if (!tipo_caso) {
      throw new NotFoundException('El tipo de caso no fué encontrado');
    }

    const metodo_hallazgo = await this.metodoHallazgoRepository.findOne(
      metodo_hallazgo_id,
    );
    if (!metodo_hallazgo) {
      throw new NotFoundException('El método de hallazgo no fué encontrado');
    }

    const factor_riesgo = await this.factorRiesgoRepository.findOne(
      factor_riesgo_id,
    );
    if (!factor_riesgo) {
      throw new NotFoundException('El factor de riesgo no fué encontrado');
    }

    const impresion_diagnostica =
      await this.impresionDiagnosticaRepository.findOne(
        impresion_diagnostica_id,
      );
    if (!impresion_diagnostica) {
      throw new NotFoundException('La impresión diagnóstica no fué encontrada');
    }

    let persona = await this.personaRepository.findOne({
      ci: persona_ci,
      visible: true,
    });
    if (!persona) {
      persona = new Persona();
      persona.ci = persona_ci;
      persona.nombre = persona_nombre;
      persona.apellidos = persona_apellidos;
      persona.edad = parseInt(persona_edad);
      persona.sexo = persona_sexo;
      persona.color_piel = persona_piel;
      persona.direccion = persona_direccion;
      persona.ocupacion = persona_ocupacion;
      persona.centro = persona_centro;
      persona.telefono_centro = telefono_centro;
      persona.direccion_centro = direccion_centro;
      persona.cmf = cmf;
      persona.consejo = consejo;
      persona.pais = pais;
      await persona.save();
    } else {
      persona.ci = persona_ci;
      persona.nombre = persona_nombre;
      persona.apellidos = persona_apellidos;
      persona.edad = parseInt(persona_edad);
      persona.sexo = persona_sexo;
      persona.color_piel = persona_piel;
      persona.direccion = persona_direccion;
      persona.ocupacion = persona_ocupacion;
      persona.centro = persona_centro;
      persona.telefono_centro = telefono_centro;
      persona.direccion_centro = direccion_centro;
      persona.cmf = cmf;
      persona.consejo = consejo;
      persona.pais = pais;
      await persona.save();
    }
    entity.fecha_sospecha = new Date(fecha_sospecha);
    entity.fecha_sintomas = new Date(fecha_sintomas);
    entity.arribado = arribado == 'true';
    entity.fecha_arribo = new Date(fecha_arribo);
    entity.lugar_estancia = lugar_estancia;
    entity.centro_remite = centro_remite;
    entity.iscontacto = iscontacto == 'true';
    entity.lugar_contacto = lugar_contacto;
    entity.tipo_contacto = tipo_contacto;
    entity.fecha_contacto = new Date(fecha_contacto);
    entity.otros_sintomas = otros_sintomas;
    entity.fecha_inicio_aislamiento = new Date(fecha_inicio_aislamiento);
    entity.fecha_fin_aislamiento = new Date(fecha_fin_aislamiento);
    entity.fin_aislamiento = fin_aislamiento;
    entity.fecha_inicio_vigilancia = new Date(fecha_inicio_vigilancia);
    entity.fecha_fin_vigilancia = new Date(fecha_fin_vigilancia);
    entity.alta_epidemiologica = alta_epidemiologica;
    entity.asintomatico = asintomatico == 'true';
    entity.sint_post_confirm = sint_post_confirm == 'true';
    entity.consecutivo_nacional = consecutivo_nacional;
    entity.numero_provincial = numero_provincial;
    entity.observaciones = observaciones;
    entity.trabajador_salud = trabajador_salud;
    entity.tipo_centro_remite = tipo_centro_remite;
    entity.procedente = pais;
    entity.persona = persona;
    entity.estado = estado;
    entity.fuente_infeccion = fuente_infeccion;
    entity.tipo_caso = tipo_caso;
    entity.metodo_hallazgo = metodo_hallazgo;
    entity.factor_riesgo = factor_riesgo;
    entity.impresion_diagnostica = impresion_diagnostica;

    console.log('aqui');
    entity.sintomas = [];
    if (sintomas)
      for (const iterator of sintomas) {
        const sintoma = await this.sintomaRepository.findOne({
          id: iterator,
          visible: true,
        });
        if (!sintoma) {
          throw new NotFoundException('El síntoma no fué encontrado');
        }

        entity.sintomas.push(sintoma);
      }

    entity.habitos = [];
    if (habitos)
      for (const iterator of habitos) {
        const habito = await this.habitoRepository.findOne({
          id: iterator,
          visible: true,
        });
        if (!habito) {
          throw new NotFoundException('El hábito no fué encontrado');
        }

        entity.habitos.push(habito);
      }

    persona.antecedentes = [];

    if (antecedentes)
      for (const iterator of antecedentes) {
        const antecedente = await this.antecedenteRepository.findOne({
          id: iterator,
          visible: true,
        });
        if (!antecedente) {
          throw new NotFoundException('El antecedente no fué encontrado');
        }

        persona.antecedentes.push(antecedente);
      }
    await persona.save();
    entity.persona = persona;

    // for (const iterator of contactos) {
    //   let persona = await this.personaRepository.findOne({
    //     ci: iterator['ci'],
    //     visible: true,
    //   });
    //   if (!persona) {
    //     persona = new Persona();
    //     persona.ci = iterator['ci'];
    //     persona.nombre = iterator['nombre'];
    //     persona.edad = iterator['edad'];
    //     persona.apellidos = iterator['apellidos'];
    //     persona.ocupacion = iterator['ocupacion'];
    //     persona.centro = iterator['centro'];
    //     await persona.save();
    //   }

    //   entity.contactos.push(persona);
    // }

    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }

  async addContacto(query): Promise<Persona> {
    const { expediente_id, ci, nombre, apellidos, edad, centro, direccion } =
      query;
    const expediente = await this.expedienteRepository.findOne({
      where: { id: expediente_id, visible: true },
      relations: ['contactos'],
    });
    if (!expediente) {
      throw new NotFoundException('El expediente no fué encontrado');
    }

    if (expediente.contactos.find((x) => x.ci === ci))
      throw new ConflictException('La persona ya se encuentra como contacto');

    let persona = await this.personaRepository.findOne({
      ci: ci,
      visible: true,
    });

    if (!persona) {
      persona = new Persona();
      persona.ci = ci;
      persona.nombre = nombre;
      persona.apellidos = apellidos;
      persona.edad = edad;
      persona.centro = centro;
      persona.direccion = direccion;
      await persona.save();
    }

    expediente.contactos.push(persona);
    await expediente.save();

    return persona;
  }

  async editContacto(body): Promise<Persona> {
    const { expediente_id, id, ci, nombre, edad, centro, direccion } = body;
    const expediente = await this.expedienteRepository.findOne({
      where: { id: expediente_id, visible: true },
      relations: ['contactos'],
    });

    if (!expediente) {
      throw new NotFoundException('El expediente no fué encontrado');
    }

    const existe = expediente.contactos.filter((contacto) => {
      contacto.ci === ci && contacto.id !== id;
    });
    if (existe)
      throw new ConflictException('La persona ya se encuentra como contacto');

    const persona = await this.personaRepository.findOne({
      id: id,
      visible: true,
    });

    if (!persona) {
      throw new NotFoundException('La persona no fué encontrada');
    }

    persona.ci = ci;
    persona.nombre = nombre;
    persona.edad = edad;
    persona.centro = centro;
    persona.direccion = direccion;
    await persona.save();

    return persona;
  }

  async delContacto(expediente_id, id): Promise<void> {
    // const { expediente_id, persona_id } = query;
    const expediente = await this.expedienteRepository.findOne({
      where: {
        id: expediente_id,
        visible: true,
      },
      relations: ['contactos'],
    });

    if (!expediente) {
      throw new NotFoundException('El expediente no fué encontrado');
    }

    expediente.contactos = expediente.contactos.filter(
      (contacto) => contacto.id !== parseInt(id),
    );

    await expediente.save();
  }
}
