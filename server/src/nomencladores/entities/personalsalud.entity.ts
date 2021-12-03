import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Persona } from '../../nomencladores/entities/persona.entity';
import { CategoriaOcupacional } from './categoriaocupacional.entity';
import { CentroAislamiento } from './centroaislamiento.entity';
import { Especialidad } from './especialidad.entity';
@Entity({ schema: 'nomencladores' })
export class PersonalSalud extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  mail: string | null;
  @Column({ nullable: true })
  telefono: string | null;
  @Column({ nullable: true })
  numb_registro: string | null;
  @Column({ default: true })
  visible: boolean;
  @OneToOne(() => Persona)
  persona: Persona;
  @ManyToOne(() => CategoriaOcupacional)
  catergoria_ocupacional: CategoriaOcupacional;
  @ManyToOne(() => Especialidad)
  especialidad: Especialidad;
  @ManyToOne(() => CentroAislamiento)
  centro_aislamiento: CentroAislamiento;
}
