import { Provincia } from './provincia.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'nomencladores'})
export class Municipio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  nro_orden: number;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => Provincia)
  provincia: Provincia;
}
