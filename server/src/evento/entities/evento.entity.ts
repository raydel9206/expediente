import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AreaSalud } from '../../nomencladores/entities/areaSalud.entity';
import { Consejo } from '../../nomencladores/entities/consejo.entity';
import { Pais } from '../../nomencladores/entities/pais.entity';
import { Persona } from '../../nomencladores/entities/persona.entity';
@Entity({ schema: 'datos'})
export class Evento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  denominacion: string;
  @Column()
  modalidad: string;
  @Column({ default: false })
  cerrado: boolean;
  @UpdateDateColumn({ type: 'timestamptz' })
  @Column()
  fecha_activacion: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  @Column()
  fecha_estimada_cierre: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  @Column()
  fecha_ultimo_caso: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  @Column()
  fecha_cierre: Date;
  @Column()
  tipo_brote: number;
  @Column()
  tipo_transmision: number;
  @Column()
  caso_indice: string;
  @Column()
  caso_primario: string;
  @Column()
  observaciones: string;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => AreaSalud)
  cmf: AreaSalud;
  @ManyToOne(() => Consejo)
  consejo: Consejo;
}
