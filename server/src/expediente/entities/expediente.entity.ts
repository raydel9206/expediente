import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pais } from '../../nomencladores/entities/pais.entity';

import { Persona } from '../../nomencladores/entities/persona.entity';
import { Sintoma } from '../../nomencladores/entities/sintoma.entity';
@Entity()
export class Expediente extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fecha_registro: Date;
  @Column()
  fecha_sintomas: Date;
  @Column({ default: false })
  arribado: boolean;
  @Column({ nullable: true })
  fecha_arribo: Date | null;
  @Column({ nullable: true })
  lugar_estancia: string | null;
  @Column()
  tipo_centro_remite: string;
  @Column()
  centro_remite: string;
  @Column({ default: false })
  isContacto: boolean;
  @Column({ nullable: true })
  lugar_contacto: string | null;
  @Column({ nullable: true })
  tipo_contacto: string | null;
  @Column({ nullable: true })
  fecha_contacto: Date | null;
  @Column({ nullable: true })
  otros_sintomas: string | null;
  // @ApiProperty({ enum: ['Admin', 'Moderator', 'User'] })
  @Column()
  estado: number;
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => Persona)
  persona: Persona;
  @ManyToOne(() => Persona)
  contacto: Persona;
  @ManyToOne(() => Pais)
  procedente: Pais;
  @ManyToMany(() => Persona, { eager: true })
  @JoinTable()
  contactos: Persona[];

  @ManyToMany(() => Sintoma)
  @JoinTable()
  sintomas: Sintoma[];
}
