import { IsNotEmpty } from 'class-validator';
export class CreateProvinciaDto {
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  nro_orden: number;
}
