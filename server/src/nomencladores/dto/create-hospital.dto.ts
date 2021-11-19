import { IsNotEmpty } from 'class-validator';
export class CreateHospitalDto {
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  municipio_id: string;
}
