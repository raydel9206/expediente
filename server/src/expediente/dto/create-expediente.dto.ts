import { IsBoolean, IsDate, IsNotEmpty } from 'class-validator';
export class CreateExpedienteDto {
  @IsNotEmpty()
  persona_ci: string;
  @IsNotEmpty()
  persona_nombre: string;
  @IsNotEmpty()
  persona_apellidos: string;
  @IsNotEmpty()
  persona_edad: string;
  @IsNotEmpty()
  persona_sexo: string;
  persona_direccion: string;
  persona_centro: string;
  persona_ocupacion: string;
  @IsNotEmpty()
  fecha_sintomas: string;
  @IsNotEmpty()
  arribado: string;
  fecha_arribo: string;
  lugar_estancia: string;
  @IsNotEmpty()
  tipo_centro_remite: string;
  centro_remite: string;
  @IsNotEmpty()
  isContacto: string;
  lugar_contacto: string;
  tipo_contacto: string;
  contacto_id: string;
  // @IsDate()
  fecha_contacto: string;
  otros_sintomas: string;
  @IsNotEmpty()
  pais_id: string;
  @IsNotEmpty()
  cmf_id: string;
  @IsNotEmpty()
  consejo_id: string;
  contactos: [];
  antecedentes: [];
  sintomas: [];
}
