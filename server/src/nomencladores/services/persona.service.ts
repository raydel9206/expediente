import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from '../dto/create-persona.dto';
import { Persona } from '../entities/persona.entity';
import { PersonaRepository } from '../repositories/persona.repository';
import { AreaSaludRepository } from '../repositories/areaSalud.repository';
import { ConsejoRepository } from '../repositories/consejo.repository';
import { FindPaginationDto } from '../dto/find-pagination.dto';

@Injectable()
export class PersonaService {
  constructor(
    private personaRepository: PersonaRepository,
    private areaSaludRepository: AreaSaludRepository,
    private consejoRepository: ConsejoRepository,
  ) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;
    if (combo !== undefined) {
      return this.personaRepository.findCombo();
    } else {
      return await this.personaRepository.findAll(skip, take, keyword);
    }
  }

  async getAntecedentes(persona_id: string) {
    const id = parseInt(persona_id);
    const entity = await this.personaRepository.findOne({
      id,
      visible: true,
    });
    if (!entity) {
      throw new NotFoundException('La persona no fué encontrada');
    }

    return {
      rows: entity.antecedentes,
    };
  }

  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    const {
      ci,
      nombre,
      apellidos,
      edad,
      sexo,
      color_piel,
      // telefono,
      // ocupacion,
      // centro,
      // areaSalud_id,
      // consejo_id,
    } = createPersonaDto;
    // const areaSalud = await this.areaSaludRepository.findOne(areaSalud_id);
    // const consejo = await this.consejoRepository.findOne(consejo_id);
    const entity = new Persona();
    entity.ci = ci;
    entity.nombre = nombre;
    entity.apellidos = apellidos;
    entity.edad = parseInt(edad);
    entity.sexo = sexo;
    entity.color_piel = color_piel;
    // entity.telefono = telefono;
    // entity.ocupacion = ocupacion;
    // entity.centro = centro;
    // entity.cmf = areaSalud;
    // entity.consejo = consejo;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Persona> {
    const entity = await this.personaRepository.findOne({
      id,
      visible: true,
    });
    if (!entity) {
      throw new NotFoundException('La persona no fué encontrada');
    }
    return entity;
  }

  async update(
    id: number,
    createPersonaDto: CreatePersonaDto,
  ): Promise<Persona> {
    const {
      ci,
      nombre,
      apellidos,
      edad,
      sexo,
      color_piel,
      // telefono,
      // ocupacion,
      // centro,
      // areaSalud_id,
      // consejo_id,
    } = createPersonaDto;
    const entity = await this.findOne(id);
    // const areaSalud = await this.areaSaludRepository.findOne(areaSalud_id);
    // const consejo = await this.consejoRepository.findOne(consejo_id);
    entity.ci = ci;
    entity.nombre = nombre;
    entity.apellidos = apellidos;
    entity.edad = parseInt(edad);
    entity.sexo = sexo;
    entity.color_piel = color_piel;
    // entity.telefono = telefono;
    // entity.ocupacion = ocupacion;
    // entity.centro = centro;
    // entity.cmf = areaSalud;
    // entity.consejo = consejo;
    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
