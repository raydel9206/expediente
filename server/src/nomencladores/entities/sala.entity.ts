import { Hospital } from './hospital.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'nomencladores'})
export class Sala extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => Hospital)
  hospital: Hospital;
}
