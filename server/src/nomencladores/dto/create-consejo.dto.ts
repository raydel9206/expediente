import { IsNotEmpty } from 'class-validator';
export class CreateConsejoDto {
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  nro_orden: number;
  @IsNotEmpty()
  municipio_id: string;
}
