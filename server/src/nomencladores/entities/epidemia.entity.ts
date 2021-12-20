import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'nomencladores' })
export class Epidemia extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column({ nullable: true })
  descripcion: string | null;
  @Column({ default: true })
  visible: boolean;
}
