import { IsNotEmpty } from 'class-validator';
export class CreateSeguimientoDto {
  @IsNotEmpty()
  // @IsDate()
  fecha_ingreso: string;
  @IsNotEmpty()
  // @IsDate()
  fecha_alta: string;
  // @IsNotEmpty()
  hospital_id: string;
  expediente_id: string;
}
