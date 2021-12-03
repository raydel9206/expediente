import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'nomencladores'})
export class Sintoma extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  descripcion: string;
  @Column({ default: true })
  visible: boolean;
}
