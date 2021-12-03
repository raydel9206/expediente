import { FactorRiesgo } from 'src/nomencladores/entities/factorriesgo.entity';
import { FuenteInfeccion } from 'src/nomencladores/entities/fuenteinfeccion.entity';
import { ImpresionDiagnostica } from 'src/nomencladores/entities/impresiondiagnostica.entity';
import { MetodoHallazgo } from 'src/nomencladores/entities/metodohallazgo.entity';
import { TipoCaso } from 'src/nomencladores/entities/tipocaso.entity';
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
@Entity({ schema: 'datos' })
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
  iscontacto: boolean;
  @Column({ nullable: true })
  lugar_contacto: string | null;
  @Column({ nullable: true })
  tipo_contacto: string | null;
  @Column({ nullable: true })
  fecha_contacto: Date | null;
  @Column({ nullable: true })
  otros_sintomas: string | null;
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

  @ManyToOne(() => FuenteInfeccion)
  fuente_infeccion: FuenteInfeccion;

  @ManyToOne(() => TipoCaso)
  tipo_caso: TipoCaso;

  @ManyToOne(() => MetodoHallazgo)
  metodo_hallazgo: MetodoHallazgo;

  @ManyToOne(() => FactorRiesgo)
  factor_riesgo: FactorRiesgo;

  @ManyToOne(() => ImpresionDiagnostica)
  impresion_diagnostica: ImpresionDiagnostica;  

  public addContacto(persona: Persona) {
    this.contactos.push(persona);
  }
}
