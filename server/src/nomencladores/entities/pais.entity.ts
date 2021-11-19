import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Pais extends BaseEntity {  
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 'Cuba', description: 'Nombre del país' })
  @Column()
  nombre: string;
  @ApiProperty({ example: 'cubano', description: 'Gentilicio del país' })
  @Column()
  nacionalidad: string;
  @ApiProperty()
  @Column({ default: true })
  visible: boolean;
}
