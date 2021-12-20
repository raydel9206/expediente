import { IsNotEmpty } from 'class-validator';
export class CreateAsistenciaDto {
  @IsNotEmpty()
  fecha_ingreso: string;
  cama: string;
  historia_clinica: string;
  @IsNotEmpty()
  fecha_egreso: string;
  // @IsNotEmpty()
  // alta_clinica: string;
  causa_fallecimiento_id: string;
  @IsNotEmpty()
  hospital_id: string;
  @IsNotEmpty()
  expediente_id: string;
}
