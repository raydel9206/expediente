import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expediente } from './expediente.entity';

@Entity({ schema: 'datos' })
export class Traslado extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fecha: Date;
  @Column()
  agente: string;
  @Column()
  demanda: string;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => Expediente)
  expediente: Expediente;
}
