import { IsNotEmpty } from 'class-validator';
export class CreatePersonaDto {
  @IsNotEmpty()
  ci: string;
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  apellidos: string;
  @IsNotEmpty()
  edad: string;
  @IsNotEmpty()
  sexo: string;
  @IsNotEmpty()
  color_piel: string;
  // @IsNotEmpty()
  // telefono: string;
  // @IsNotEmpty()
  // ocupacion: string;
  // @IsNotEmpty()
  // centro: string;
  // @IsNotEmpty()
  // areaSalud_id: string;
  // @IsNotEmpty()
  // consejo_id: string;
}
