import { IsNotEmpty } from 'class-validator';
export class CreateEvolucionDto {
  @IsNotEmpty()
  descripcion: string;
  @IsNotEmpty()
  expediente_id: string;
}
