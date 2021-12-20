import { IsNotEmpty } from 'class-validator';
export class CreateTrasladoDto {
  @IsNotEmpty()
  fecha: string;
  @IsNotEmpty()
  agente: string;
  @IsNotEmpty()
  demanda: string;
  @IsNotEmpty()
  expediente_id: string;
}
