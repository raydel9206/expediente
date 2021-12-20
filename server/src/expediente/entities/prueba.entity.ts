import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asistencia } from './asistencia.entity';

@Entity({ schema: 'datos'})
export class Prueba extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fecha: Date;
  @Column()
  tipo_prueba: string;
  @Column()
  tipo_muestra: string;
  @Column()
  tecnico: string;
  @Column()
  resultado: boolean;
  @Column()
  placa_base: string;
  @Column()
  orden: string;
  @Column()
  observaciones: string;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => Asistencia)
  asistencia: Asistencia;
}
