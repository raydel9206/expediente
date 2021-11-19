import { IsNotEmpty } from 'class-validator';
export class CreateSintomaDto {
  @IsNotEmpty()
  descripcion: string;
}
