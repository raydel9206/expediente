import { IsNotEmpty } from 'class-validator';
export class CreatePruebaDto {
  @IsNotEmpty()
  fecha: string;
  @IsNotEmpty()
  tipo_prueba: string;
  @IsNotEmpty()
  tipo_muestra: string;
  @IsNotEmpty()
  tecnico: string;
  @IsNotEmpty()
  resultado: boolean;
  @IsNotEmpty()
  placa_base: string;
  @IsNotEmpty()
  orden: string;
  observaciones: string;
  @IsNotEmpty()
  asistencia_id: string;
}
