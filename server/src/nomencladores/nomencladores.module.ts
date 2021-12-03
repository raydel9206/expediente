import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaisController } from './controllers/pais.controller';
import { PaisRepository } from './repositories/pais.repository';
import { PaisService } from './services/pais.service';
import { ProvinciaController } from './controllers/provincia.controller';
import { ProvinciaService } from './services/provincia.service';
import { ProvinciaRepository } from './repositories/provincia.repository';
import { MunicipioService } from './services/municipio.service';
import { MunicipioController } from '../nomencladores/controllers/municipio.controller';
import { MunicipioRepository } from './repositories/municipio.repository';
import { ConsejoService } from './services/consejo.service';
import { ConsejoController } from './controllers/consejo.controller';
import { ConsejoRepository } from './repositories/consejo.repository';
import { AreaSaludRepository } from './repositories/areaSalud.repository';
import { AreaSaludController } from '../nomencladores/controllers/areaSalud.controller';
import { AreaSaludService } from './services/areaSalud.service';
import { PersonaRepository } from './repositories/persona.repository';
import { PersonaController } from './controllers/persona.controller';
import { PersonaService } from './services/persona.service';
import { PoliclinicoRepository } from './repositories/policlinico.repository';
import { PoliclinicoController } from '../nomencladores/controllers/policlinico.controller';
import { PoliclinicoService } from './services/policlinico.service';
import { HospitalRepository } from './repositories/hospital.repository';
import { HospitalController } from './controllers/hospital.controller';
import { HospitalService } from './services/hospital.service';
import { SintomaRepository } from './repositories/sintoma.repository';
import { SintomaController } from './controllers/sintoma.controller';
import { SintomaService } from './services/sintoma.service';
import { AntecedenteRepository } from './repositories/antecedente.repository';
import { AntecedenteService } from './services/antecedente.service';
import { AntecedenteController } from './controllers/antecedente.controller';
import { TratamientoBaseRepository } from './repositories/tratamientobase.repository';
import { TratamientoBaseService } from './services/tratamientobase.service';
import { TratamientoBaseController } from './controllers/tratamientobase.controller';
import { EstadoRepository } from './repositories/estado.repository';
import { EstadoService } from './services/estado.service';
import { EstadoController } from './controllers/estado.controller';
import { SalaRepository } from './repositories/sala.repository';
import { SalaService } from './services/sala.service';
import { SalaController } from './controllers/sala.controller';
import { HabitoRepository } from './repositories/habito.repository';
import { HabitoService } from './services/habito.service';
import { HabitoController } from './controllers/habito.controller';
import { EpidemiaRepository } from './repositories/epidemia.repository';
import { EpidemiaService } from './services/epidemia.service';
import { EpidemiaController } from './controllers/epidemia.controller';
import { TipoPruebaRepository } from './repositories/tipoprueba.repository';
import { TipoPruebaService } from './services/tipoprueba.service';
import { TipoPruebaController } from './controllers/tipoprueba.controller';
import { ResultadoPruebaRepository } from './repositories/resultadoprueba.repository';
import { ResultadoPruebaService } from './services/resultadoprueba.service';
import { ResultadoPruebaController } from './controllers/resultadoprueba.controller';
import { EspecialidadRepository } from './repositories/especialidad.repository';
import { EspecialidadService } from './services/especialidad.service';
import { EspecialidadController } from './controllers/especialidad.controller';
import { ParentescoRepository } from './repositories/parentesco.repository';
import { ParentescoService } from './services/parentesco.service';
import { ParentescoController } from './controllers/parentesco.controller';
import { CategoriaOcupacionalRepository } from './repositories/categoriaocupacional.repository';
import { CategoriaOcupacionalService } from './services/categoriaocupacional.service';
import { CategoriaOcupacionalController } from './controllers/categoriaocupacional.controller';
import { TipoContactoRepository } from './repositories/tipocontacto.repository';
import { TipoContactoService } from './services/tipocontacto.service';
import { TipoContactoController } from './controllers/tipocontacto.controller';
import { CausaFallecimientoRepository } from './repositories/causafallecimiento.repository';
import { CausaFallecimientoService } from './services/causafallecimiento.service';
import { CausaFallecimientoController } from './controllers/causafallecimiento.controller';
import { FuenteInfeccionRepository } from './repositories/fuenteinfeccion.repository';
import { FuenteInfeccionService } from './services/fuenteinfeccion.service';
import { FuenteInfeccionController } from './controllers/fuenteinfeccion.controller';
import { TipoCasoRepository } from './repositories/tipocaso.repository';
import { TipoCasoService } from './services/tipocaso.service';
import { TipoCasoController } from './controllers/tipocaso.controller';
import { MetodoHallazgoRepository } from './repositories/metodohallazgo.repository';
import { MetodoHallazgoService } from './services/metodohallazgo.service';
import { MetodoHallazgoController } from './controllers/metodohallazgo.controller';
import { FactorRiesgoRepository } from './repositories/factorriesgo.repository';
import { FactorRiesgoService } from './services/factorriesgo.service';
import { FactorRiesgoController } from './controllers/factorriesgo.controller';
import { ImpresionDiagnosticaRepository } from './repositories/impresiondiagnostica.repository';
import { ImpresionDiagnosticaService } from './services/impresiondiagnostica.service';
import { ImpresionDiagnosticaController } from './controllers/impresiondiagnostica.controller';
import { CentroAislamientoRepository } from './repositories/centroaislamiento.repository';
import { CentroAislamientoService } from './services/centroaislamiento.service';
import { CentroAislamientoController } from './controllers/centroaislamiento.controller';
import { TrabajoSaludRepository } from './repositories/trabajosalud.repository';
import { TrabajoSaludService } from './services/trabajosalud.service';
import { TrabajoSaludController } from './controllers/trabajosalud.controller';


@Module({
  imports: [
    // forwardRef(() => ExpedienteModule),
    TypeOrmModule.forFeature([
      PaisRepository,
      ProvinciaRepository,
      MunicipioRepository,
      ConsejoRepository,
      HospitalRepository,
      PoliclinicoRepository,
      AreaSaludRepository,
      PersonaRepository,
      SintomaRepository,
      AntecedenteRepository,
      TratamientoBaseRepository,
      EstadoRepository,
      SalaRepository,
      HabitoRepository,
      EpidemiaRepository,
      TipoPruebaRepository,
      ResultadoPruebaRepository,
      EspecialidadRepository,
      ParentescoRepository,
      CategoriaOcupacionalRepository,
      TipoContactoRepository,
      CausaFallecimientoRepository,
      FuenteInfeccionRepository,
      TipoCasoRepository,
      MetodoHallazgoRepository,
      FactorRiesgoRepository,
      ImpresionDiagnosticaRepository,
      CentroAislamientoRepository,
      TrabajoSaludRepository,
    ]),
  ],
  controllers: [
    PaisController,
    ProvinciaController,
    MunicipioController,
    ConsejoController,
    HospitalController,
    PoliclinicoController,
    AreaSaludController,
    PersonaController,
    SintomaController,
    AntecedenteController,
    TratamientoBaseController,
    EstadoController,
    SalaController,
    HabitoController,
    EpidemiaController,
    TipoPruebaController,
    ResultadoPruebaController,
    EspecialidadController,
    ParentescoController,
    CategoriaOcupacionalController,
    TipoContactoController,
    CausaFallecimientoController,
    FuenteInfeccionController,
    TipoCasoController,
    MetodoHallazgoController,
    FactorRiesgoController,
    ImpresionDiagnosticaController,
    CentroAislamientoController,
    TrabajoSaludController,
  ],
  providers: [
    PaisService,
    ProvinciaService,
    MunicipioService,
    PoliclinicoService,
    ConsejoService,
    HospitalService,
    AreaSaludService,
    PersonaService,
    SintomaService,
    AntecedenteService,
    TratamientoBaseService,
    EstadoService,
    SalaService,
    HabitoService,
    EpidemiaService,
    TipoPruebaService,
    ResultadoPruebaService,
    EspecialidadService,
    ParentescoService,
    CategoriaOcupacionalService,
    TipoContactoService,
    CausaFallecimientoService,
    FuenteInfeccionService,
    TipoCasoService,
    MetodoHallazgoService,
    FactorRiesgoService,
    ImpresionDiagnosticaService,
    CentroAislamientoService,
    TrabajoSaludService,
  ],
})
export class NomencladoresModule {}
