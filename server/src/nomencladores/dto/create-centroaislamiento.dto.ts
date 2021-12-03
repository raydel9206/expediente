import { IsNotEmpty } from 'class-validator';
export class CreateCentroAislamientoDto {
  @IsNotEmpty()
  nombre: string;
  disponibilidad: number;
  @IsNotEmpty()
  municipio_id: string;
}
