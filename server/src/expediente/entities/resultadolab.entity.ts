import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seguimiento } from './seguimiento.entity';

@Entity({ schema: 'datos'})
export class ResultadoLab extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fecha: Date;
  @Column()
  hemograma: string;
  @Column()
  gasometria: string;
  @Column()
  ionograma: string;
  @Column()
  otros: string;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => Seguimiento)
  seguimiento: Seguimiento;
}
