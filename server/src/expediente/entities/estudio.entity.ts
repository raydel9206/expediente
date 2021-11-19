import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seguimiento } from './seguimiento.entity';

@Entity()
export class Estudio extends BaseEntity {
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
  @ManyToOne(() => Seguimiento)
  seguimiento: Seguimiento;
}
