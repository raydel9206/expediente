import { IsBoolean, IsNotEmpty } from 'class-validator';
export class CreateEventoDto {
  denominacion: string;
  @IsNotEmpty()
  modalidad: string;
  @IsNotEmpty()
  @IsBoolean()
  cerrado: boolean;
  @IsNotEmpty()
  fecha_activacion: Date;
  @IsNotEmpty()
  fecha_estimiada_cierre: Date;
  @IsNotEmpty()
  fecha_ultimo_caso: Date;
  @IsNotEmpty()
  fecha_cierre: Date;
  @IsNotEmpty()
  tipo_brote: number;
  @IsNotEmpty()
  tipo_transmision: number;
  @IsNotEmpty()
  caso_indice: string;
  @IsNotEmpty()
  caso_primario: string;
  @IsNotEmpty()
  observaciones: string;
  @IsNotEmpty()
  areaSalud_id: string;
  @IsNotEmpty()
  consejo_id: string;
  medidas: [];
}
