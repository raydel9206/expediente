import { Municipio } from './municipio.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Policlinico extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => Municipio)
  municipio: Municipio;
}
