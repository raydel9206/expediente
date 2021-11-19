import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Evento } from './evento.entity';
@Entity()
export class Medida extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  numero: number;
  @Column()
  medida: string;
  @UpdateDateColumn({ type: 'timestamptz' })
  @Column()
  fecha_inicio: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  @Column()
  fecha_fin: Date;
  @Column()
  responsable: string;
  @Column()
  tipo_accion: number;
  @Column()
  observaciones: string;
  @Column()
  estado: number;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => Evento)
  evento: Evento;
}
