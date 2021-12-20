import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expediente } from './expediente.entity';
import { Hospital } from '../../nomencladores/entities/hospital.entity';
import { CausaFallecimiento } from 'src/nomencladores/entities/causafallecimiento.entity';

@Entity({ schema: 'datos' })
export class Asistencia extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fecha_ingreso: Date;
  @Column()
  cama: string;
  // @Column()
  // historia_clinica: string;
  @Column()
  fecha_egreso: Date;
  // @Column({ default: false })
  // alta_clinica: boolean;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => Hospital)
  hospital: Hospital;
  @ManyToOne(() => CausaFallecimiento)
  causa_fallecimiento: CausaFallecimiento;
  @ManyToOne(() => Expediente)
  expediente: Expediente;
}
