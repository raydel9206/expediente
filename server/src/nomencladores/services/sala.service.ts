import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalaDto } from '../dto/create-sala.dto';
import { Sala } from '../entities/sala.entity';
import { SalaRepository } from '../repositories/sala.repository';
import { HospitalRepository } from '../repositories/hospital.repository';

@Injectable()
export class SalaService {
  constructor(
    private salaRepository: SalaRepository,
    private hospitalRepository: HospitalRepository,
  ) {}

  async findAll() {
    return this.salaRepository.findAll();
  }

  async findByHospital(hospital_id: string) {
    const rows = await this.salaRepository.find({
      relations: ['hospital'],
      where: {
        visible: true,
        hospital: {
          id: hospital_id,
        },
      },
      order: { nombre: 'ASC' },
    });

    return {
      rows: rows,
    };
  }

  async create(createSalaDto: CreateSalaDto): Promise<Sala> {
    const { nombre, hospital_id } = createSalaDto;
    const hospital = await this.hospitalRepository.findOne(hospital_id);
    const entity = new Sala();
    entity.nombre = nombre;
    entity.hospital = hospital;
    await entity.save();
    return entity;
  }

  async findOne(id: number): Promise<Sala> {
    const entity = await this.salaRepository.findOne({
      relations: ['hospital'],
      where: {
        id,
        visible: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('El sala no fué encontrado');
    }
    return entity;
  }

  async update(id: number, createSalaDto: CreateSalaDto): Promise<Sala> {
    const entity = await this.findOne(id);
    const { nombre, hospital_id } = createSalaDto;
    const hospital = await this.hospitalRepository.findOne(hospital_id);
    entity.nombre = nombre;
    entity.hospital = hospital;
    await entity.save();
    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
