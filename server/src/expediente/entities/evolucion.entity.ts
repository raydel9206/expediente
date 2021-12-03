import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expediente } from './expediente.entity';

@Entity({ schema: 'datos'})
export class Evolucion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  descripcion: string;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => Expediente)
  expediente: Expediente;
}
