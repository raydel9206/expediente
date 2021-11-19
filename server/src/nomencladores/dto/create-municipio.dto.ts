import { IsNotEmpty } from 'class-validator';
export class CreateMunicipioDto {
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  nro_orden: number;
  @IsNotEmpty()
  provincia_id: string;
}
