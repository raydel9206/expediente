import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Municipio } from './municipio.entity';

@Entity()
export class Hospital extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => Municipio)
  municipio: Municipio;
}
