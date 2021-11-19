import { IsNotEmpty } from 'class-validator';
export class CreateAreaSaludDto {
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  policlinico_id: string;
}
