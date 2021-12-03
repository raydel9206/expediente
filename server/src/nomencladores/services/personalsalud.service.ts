import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonalSaludDto } from '../dto/create-personalsalud.dto';
import { PersonalSalud } from '../entities/personalsalud.entity';
import { PersonalSaludRepository } from '../repositories/personalsalud.repository';
import { PersonaRepository } from '../repositories/persona.repository';
import { EspecialidadRepository } from '../repositories/especialidad.repository';
import { CentroAislamientoRepository } from '../repositories/centroaislamiento.repository';
import { CategoriaOcupacionalRepository } from '../repositories/categoriaocupacional.repository';
import { FindPaginationDto } from '../dto/find-pagination.dto';

@Injectable()
export class PersonalSaludService {
  constructor(
    private personalsaludRepository: PersonalSaludRepository,
    private personaRepository: PersonaRepository,
    private especialidadRepository: EspecialidadRepository,
    private categoriaocupacionalRepository: CategoriaOcupacionalRepository,
    private centroaislamientoRepository: CentroAislamientoRepository,
  ) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;
    if (combo !== undefined) {
      return this.personalsaludRepository.findCombo();
    } else {
      return await this.personalsaludRepository.findAll(skip, take, keyword);
    }
  }

  async create(
    createPersonalSaludDto: CreatePersonalSaludDto,
  ): Promise<PersonalSalud> {
    const {
      mail,
      telefono,
      numb_registro,
      persona_id,
      especialidad_id,
      catergoria_ocupacional_id,
      centro_aislamiento_id,
    } = createPersonalSaludDto;
    const persona = await this.personaRepository.findOne(persona_id);
    const especialidad = await this.especialidadRepository.findOne(
      especialidad_id,
    );
    const catergoria_ocupacional =
      await this.categoriaocupacionalRepository.findOne(
        catergoria_ocupacional_id,
      );
    const centro_aislamiento = await this.centroaislamientoRepository.findOne(
      centro_aislamiento_id,
    );
    const entity = new PersonalSalud();
    entity.mail = mail;
    entity.telefono = telefono;
    entity.numb_registro = numb_registro;
    entity.persona = persona;
    entity.especialidad = especialidad;
    entity.catergoria_ocupacional = catergoria_ocupacional;
    entity.centro_aislamiento = centro_aislamiento;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<PersonalSalud> {
    const entity = await this.personalsaludRepository.findOne({
      id,
      visible: true,
    });
    if (!entity) {
      throw new NotFoundException('La persona de salud no fué encontrada');
    }
    return entity;
  }

  async update(
    id: number,
    createPersonalSaludDto: CreatePersonalSaludDto,
  ): Promise<PersonalSalud> {
    const {
      mail,
      telefono,
      numb_registro,
      persona_id,
      especialidad_id,
      catergoria_ocupacional_id,
      centro_aislamiento_id,
    } = createPersonalSaludDto;
    const entity = await this.findOne(id);
    const persona = await this.personaRepository.findOne(persona_id);
    const especialidad = await this.especialidadRepository.findOne(
      especialidad_id,
    );
    const catergoria_ocupacional =
      await this.categoriaocupacionalRepository.findOne(
        catergoria_ocupacional_id,
      );
    const centro_aislamiento = await this.centroaislamientoRepository.findOne(
      centro_aislamiento_id,
    );
    entity.mail = mail;
    entity.telefono = telefono;
    entity.numb_registro = numb_registro;
    entity.persona = persona;
    entity.especialidad = especialidad;
    entity.catergoria_ocupacional = catergoria_ocupacional;
    entity.centro_aislamiento = centro_aislamiento;
    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
