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
  persona_piel: string;
  persona_direccion: string;
  persona_centro: string;
  telefono_centro: string;
  direccion_centro: string;
  persona_ocupacion: string;
  @IsNotEmpty()
  fecha_sospecha: string;
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
  iscontacto: string;
  lugar_contacto: string;
  tipo_contacto: string;
  contacto_id: string;
  // @IsDate()
  fecha_contacto: string;
  otros_sintomas: string;
  fecha_inicio_aislamiento: string;
  fecha_fin_aislamiento: string;
  fin_aislamiento: boolean;
  fecha_inicio_vigilancia: string;
  fecha_fin_vigilancia: string;
  alta_epidemiologica: boolean;
  asintomatico: string;
  sint_post_confirm: string;
  consecutivo_nacional: string;F
  numero_provincial: string;
  observaciones: string;
  @IsNotEmpty()
  trabajador_salud: string;
  @IsNotEmpty()
  pais_id: string;
  procede_id: string;
  @IsNotEmpty()
  cmf_id: string;
  @IsNotEmpty()
  consejo_id: string;
  @IsNotEmpty()
  epidemia_id: string;
  @IsNotEmpty()
  estado_id: string;
  @IsNotEmpty()
  fuente_infeccion_id: string;
  @IsNotEmpty()
  tipo_caso_id: string;
  @IsNotEmpty()
  metodo_hallazgo_id: string;
  @IsNotEmpty()
  factor_riesgo_id: string;
  @IsNotEmpty()
  impresion_diagnostica_id: string;
  antecedentes: [];
  sintomas: [];
  habitos: [];
}
