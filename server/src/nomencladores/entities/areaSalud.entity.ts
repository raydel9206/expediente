import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Policlinico } from './policlinico.entity';
@Entity()
export class AreaSalud extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  nombre: string;
  @ApiProperty()
  @Column({ default: true })
  visible: boolean;
  @ManyToOne(() => Policlinico)
  policlinico: Policlinico;
}
