import { IsNotEmpty } from 'class-validator';
export class CreateEstudioDto {
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
  seguimiento_id: string;
}
