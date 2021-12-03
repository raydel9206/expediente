import { IsNotEmpty } from 'class-validator';
export class CreatePersonalSaludDto {
  mail: string;
  telefono: string;
  numb_registro: string;
  @IsNotEmpty()
  persona_id: string;
  @IsNotEmpty()
  catergoria_ocupacional_id: string;
  @IsNotEmpty()
  especialidad_id: string;
  @IsNotEmpty()
  centro_aislamiento_id: string;
}
