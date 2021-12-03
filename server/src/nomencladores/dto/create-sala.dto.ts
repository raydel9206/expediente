import { IsNotEmpty } from 'class-validator';
export class CreateSalaDto {
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  hospital_id: string;
}
