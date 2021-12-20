import { IsNotEmpty } from 'class-validator';
export class CreateResultadoLabDto {
  @IsNotEmpty()
  fecha: Date;
  hemograma: string;
  gasometria: string;
  ionograma: string;
  otros: string;
  @IsNotEmpty()
  asistencia_id: string;
}
