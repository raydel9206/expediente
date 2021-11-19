import { IsNotEmpty } from 'class-validator';
export class CreatePoliclinicoDto {
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
municipio_id: string;

}
