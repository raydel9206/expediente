import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpedienteDto } from '../dto/create-expediente.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';
import { Expediente } from '../entities/expediente.entity';
import { AntecedenteRepository } from '../../nomencladores/repositories/antecedente.repository';
import { AreaSaludRepository } from '../../nomencladores/repositories/areaSalud.repository';
// import { UpdateExpedienteDto } from '../dto/update-cmf.dto';
import { ExpedienteRepository } from '../repositories/expediente.repository';
import { PaisRepository } from '../../nomencladores/repositories/pais.repository';
import { PersonaRepository } from '../../nomencladores/repositories/persona.repository';
import { Persona } from 'src/nomencladores/entities/persona.entity';
import { ConsejoRepository } from 'src/nomencladores/repositories/consejo.repository';
import { exception } from 'console';

@Injectable()
export class ExpedienteService {
  constructor(
    private expedienteRepository: ExpedienteRepository,
    private personaRepository: PersonaRepository,
    private paisRepository: PaisRepository,
    private cmfRepository: AreaSaludRepository,
    private antecedenteRepository: AntecedenteRepository,
    private consejoRepository: ConsejoRepository,
  ) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;
    return await this.expedienteRepository.findAll(skip, take, keyword);
  }

  async getContactos(expediente_id: string) {
    // return await this.expedienteRepository.findContactos(0, 10, 1, '');
    // const entity = await this.expedienteRepository.findOne({
    //   where: {
    //     id: expediente_id,
    //     visible: true,
    //   },
    //   relations: ['contactos'],
    //   skip: 1,
    // });
    // if (entity.length == 0) {
    //   throw new NotFoundException('El expediente no fué encontrado');
    // }
    // return {
    //   rows: entity[0].contactos,
    // };
  }

  async getSintomas(expediente_id: string) {
    const id = parseInt(expediente_id);
    const entity = await this.expedienteRepository.find({
      where: {
        id: id,
        visible: true,
      },
      relations: ['sintomas'],
      skip: 1,
    });
    if (entity.length == 0) {
      throw new NotFoundException('El expediente no fué encontrado');
    }

    return {
      rows: entity[0].sintomas,
    };
  }

  async create(createExpedienteDto: CreateExpedienteDto): Promise<Expediente> {
    const {
      persona_ci,
      persona_nombre,
      persona_apellidos,
      persona_edad,
      persona_sexo,
      persona_centro,
      persona_ocupacion,
      fecha_sintomas,
      arribado,
      fecha_arribo,
      lugar_estancia,
      tipo_centro_remite,
      centro_remite,
      isContacto,
      lugar_contacto,
      tipo_contacto,
      fecha_contacto,
      otros_sintomas,
      pais_id,
      cmf_id,
      consejo_id,
      contactos,
      antecedentes,
    } = createExpedienteDto;
    let pais = null;
    if (pais_id) {
      pais = await this.paisRepository.findOne(pais_id);
    }
    const cmf = await this.cmfRepository.findOne(cmf_id);
    if (!cmf) {
      throw new NotFoundException('La área de salud no fué encontrada');
    }
    const consejo = await this.consejoRepository.findOne(consejo_id);
    if (!consejo) {
      throw new NotFoundException('El consejo no fué encontrado');
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
      persona.ocupacion = persona_ocupacion;
      persona.centro = persona_centro;
      persona.cmf = cmf;
      persona.consejo = consejo;
      persona.save();
    } else {
      persona.ci = persona_ci;
      persona.nombre = persona_nombre;
      persona.apellidos = persona_apellidos;
      persona.edad = parseInt(persona_edad);
      persona.sexo = persona_sexo;
      persona.ocupacion = persona_ocupacion;
      persona.centro = persona_centro;
      persona.cmf = cmf;
      persona.consejo = consejo;
      persona.save();
    }
    const entity = new Expediente();
    entity.fecha_registro = new Date();
    entity.fecha_sintomas = new Date(fecha_sintomas);
    entity.arribado = arribado == 'true';
    entity.fecha_arribo = fecha_arribo ? new Date(fecha_arribo) : null;
    entity.lugar_estancia = lugar_estancia;
    entity.tipo_centro_remite = tipo_centro_remite;
    entity.centro_remite = centro_remite;
    entity.isContacto = isContacto == 'true';
    entity.lugar_contacto = lugar_contacto;
    entity.tipo_contacto = tipo_contacto;
    entity.fecha_contacto = fecha_contacto ? new Date(fecha_contacto) : null;
    entity.otros_sintomas = otros_sintomas;
    entity.procedente = pais;
    entity.estado = 1;

    // console.log(entity.fecha_registro);

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

    entity.persona = persona;

    for (const iterator of contactos) {
      let persona = await this.personaRepository.findOne({
        ci: iterator['ci'],
        visible: true,
      });
      if (!persona) {
        persona = new Persona();
        persona.ci = iterator['ci'];
        persona.nombre = iterator['nombre'];
        persona.edad = iterator['edad'];
        persona.apellidos = iterator['apellidos'];
        persona.ocupacion = iterator['ocupacion'];
        persona.centro = iterator['centro'];
        persona.save();
      }

      entity.contactos.push(persona);
    }

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
      persona_centro,
      persona_ocupacion,
      fecha_sintomas,
      arribado,
      fecha_arribo,
      lugar_estancia,
      tipo_centro_remite,
      centro_remite,
      isContacto,
      lugar_contacto,
      tipo_contacto,
      fecha_contacto,
      otros_sintomas,
      pais_id,
      cmf_id,
      consejo_id,
      contactos,
      antecedentes,
    } = createExpedienteDto;
    const entity = await this.findOne(id);
    let pais = null;
    if (pais_id) {
      pais = await this.paisRepository.findOne(pais_id);
    }
    const cmf = await this.cmfRepository.findOne(cmf_id);
    if (!cmf) {
      throw new NotFoundException('La área de salud no fué encontrada');
    }
    const consejo = await this.consejoRepository.findOne(consejo_id);
    if (!consejo) {
      throw new NotFoundException('El consejo no fué encontrado');
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
      persona.ocupacion = persona_ocupacion;
      persona.centro = persona_centro;
      persona.cmf = cmf;
      persona.consejo = consejo;
      persona.save();
    } else {
      persona.ci = persona_ci;
      persona.nombre = persona_nombre;
      persona.apellidos = persona_apellidos;
      persona.edad = parseInt(persona_edad);
      persona.sexo = persona_sexo;
      persona.ocupacion = persona_ocupacion;
      persona.centro = persona_centro;
      persona.cmf = cmf;
      persona.consejo = consejo;
      persona.save();
    }

    entity.fecha_sintomas = new Date(fecha_sintomas);
    entity.arribado = arribado == 'true';
    entity.fecha_arribo = new Date(fecha_arribo);
    entity.lugar_estancia = lugar_estancia;
    entity.centro_remite = centro_remite;
    entity.isContacto = isContacto == 'true';
    entity.lugar_contacto = lugar_contacto;
    entity.tipo_contacto = tipo_contacto;
    entity.fecha_contacto = new Date(fecha_contacto);
    entity.otros_sintomas = otros_sintomas;
    entity.tipo_centro_remite = tipo_centro_remite;
    entity.procedente = pais;
    entity.persona = persona;

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
    persona.save();
    entity.persona = persona;

    for (const iterator of contactos) {
      let persona = await this.personaRepository.findOne({
        ci: iterator['ci'],
        visible: true,
      });
      if (!persona) {
        persona = new Persona();
        persona.ci = iterator['ci'];
        persona.nombre = iterator['nombre'];
        persona.edad = iterator['edad'];
        persona.apellidos = iterator['apellidos'];
        persona.ocupacion = iterator['ocupacion'];
        persona.centro = iterator['centro'];
        persona.save();
      }

      entity.contactos.push(persona);
    }

    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }

  async addContacto(query): Promise<Persona> {
    const { expediente_id, ci, nombre, edad, centro, direccion } = query;
    const expediente = await this.expedienteRepository.findOne({
      where: { id: expediente_id, visible: true },
      relations: ['contactos'],
    });
    if (!expediente) {
      throw new NotFoundException('El expediente no fué encontrado');
    }

    if (expediente.contactos.find((x) => x.ci === ci))
      throw new HttpException('La persona ya se encuentra como contacto', 403);

    let persona = await this.personaRepository.findOne({
      ci: ci,
      visible: true,
    });

    if (!persona) {
      persona = new Persona();
      persona.ci = ci;
      persona.nombre = nombre;
      persona.edad = edad;
      persona.centro = centro;
      persona.direccion = direccion;
      persona.save();
    }

    expediente.contactos.push(persona);
    expediente.save();

    return persona;
  }

  async editContacto(query): Promise<Persona> {
    const { expediente_id, persona_id, ci, nombre, edad, centro, direccion } =
      query;
    const expediente = await this.expedienteRepository.findOne({
      where: { id: expediente_id, visible: true },
      relations: ['contactos'],
    });

    if (!expediente) {
      throw new NotFoundException('El expediente no fué encontrado');
    }

    const persona = await this.personaRepository.findOne({
      ci: ci,
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
    persona.save();

    return persona;
  }

  async delContacto(query): Promise<void> {
    const { expediente_id, persona_id } = query;
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

    const new_contactos = expediente.contactos.filter(
      (x) => x.id !== parseInt(persona_id),
    );
    console.log(new_contactos);
    expediente.contactos = new_contactos;
    expediente.save();
  }
}
