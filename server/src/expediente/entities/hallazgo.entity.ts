import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expediente } from './expediente.entity';

@Entity()
export class Hallazgo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fecha: Date;
  @Column()
  observaciones: string;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => Expediente)
  expediente: Expediente;
}
