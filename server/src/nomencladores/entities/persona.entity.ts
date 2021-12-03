import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Antecedente } from './antecedente.entity';
import { AreaSalud } from './areaSalud.entity';
import { Consejo } from './consejo.entity';

import { Pais } from './pais.entity';
@Entity({ schema: 'nomencladores'})
export class Persona extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  ci: string;
  @Column()
  nombre: string;
  @Column()
  apellidos: string;
  @Column({ nullable: true })
  direccion: string | null;
  @Column()
  edad: number;
  @Column({ nullable: true })
  sexo: string;
  @Column({ nullable: true })
  color_piel: string;
  @Column({ nullable: true })
  telefono: string | null;
  @Column({ nullable: true })
  ocupacion: string | null;
  @Column({ nullable: true })
  centro: string | null;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => AreaSalud)
  cmf: AreaSalud;
  @ManyToOne(() => Consejo)
  consejo: Consejo;
  @ManyToOne(() => Pais)
  pais: Pais;
  @ManyToMany(() => Antecedente, { eager: true })
  @JoinTable()
  antecedentes: Antecedente[];
}
