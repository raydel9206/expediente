import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ schema: 'nomencladores'})
export class Provincia extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  nro_orden: number;
  @Column({ default: true })
  visible: boolean;
}
