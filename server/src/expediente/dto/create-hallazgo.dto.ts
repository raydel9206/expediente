import { IsNotEmpty } from 'class-validator';
export class CreateHallazgoDto {
  @IsNotEmpty()
  fecha: string;
  @IsNotEmpty()
  observaciones: string;
  @IsNotEmpty()
  expediente_id: string;
}
