import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expediente } from './expediente.entity';
import { Hospital } from '../../nomencladores/entities/hospital.entity';

@Entity()
export class Seguimiento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fecha_ingreso: Date;
  @Column()
  fecha_alta: Date;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => Expediente)
  expediente: Expediente;
  @ManyToOne(() => Hospital)
  hospital: Hospital;
}
