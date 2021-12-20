import { forwardRef, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ExpedienteService } from './services/expediente.service';
import { ExpedienteController } from './controllers/expediente.controller';
import { ExpedienteRepository } from './repositories/expediente.repository';
import { AsistenciaService } from './services/asistencia.service';
import { AsistenciaRepository } from './repositories/asistencia.repository';
import { AsistenciaController } from './controllers/asistencia.controller';
import { TrasladoService } from './services/traslado.service';
import { TrasladoRepository } from './repositories/traslado.repository';
import { TrasladoController } from './controllers/traslado.controller';
import { PruebaService } from './services/prueba.service';
import { PruebaController } from './controllers/prueba.controller';
import { PruebaRepository } from './repositories/prueba.repository';
import { ResultadoLabRepository } from './repositories/resultadolab.repository';
import { ResultadoLabController } from './controllers/resultadolab.controller';
import { ResultadoLabService } from './services/resultadolab.service';
import { PaisRepository } from 'src/nomencladores/repositories/pais.repository';
import { ConsejoRepository } from 'src/nomencladores/repositories/consejo.repository';
import { HospitalRepository } from 'src/nomencladores/repositories/hospital.repository';
import { AreaSaludRepository } from 'src/nomencladores/repositories/areaSalud.repository';
import { PersonaRepository } from 'src/nomencladores/repositories/persona.repository';
import { AntecedenteRepository } from 'src/nomencladores/repositories/antecedente.repository';
import { SintomaRepository } from 'src/nomencladores/repositories/sintoma.repository';
import { EpidemiaRepository } from 'src/nomencladores/repositories/epidemia.repository';
import { EstadoRepository } from 'src/nomencladores/repositories/estado.repository';
import { FuenteInfeccionRepository } from 'src/nomencladores/repositories/fuenteinfeccion.repository';
import { TipoCasoRepository } from 'src/nomencladores/repositories/tipocaso.repository';
import { MetodoHallazgoRepository } from 'src/nomencladores/repositories/metodohallazgo.repository';
import { FactorRiesgoRepository } from 'src/nomencladores/repositories/factorriesgo.repository';
import { ImpresionDiagnosticaRepository } from 'src/nomencladores/repositories/impresiondiagnostica.repository';
import { CausaFallecimientoRepository } from 'src/nomencladores/repositories/causafallecimiento.repository';
import { HabitoRepository } from 'src/nomencladores/repositories/habito.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExpedienteRepository,
      AsistenciaRepository,
      TrasladoRepository,
      ResultadoLabRepository,
      PruebaRepository,
      PaisRepository,
      ConsejoRepository,
      HospitalRepository,
      AreaSaludRepository,
      PersonaRepository,
      AntecedenteRepository,
      SintomaRepository,
      EpidemiaRepository,
      EstadoRepository,
      FuenteInfeccionRepository,
      TipoCasoRepository,
      MetodoHallazgoRepository,
      FactorRiesgoRepository,
      ImpresionDiagnosticaRepository,
      CausaFallecimientoRepository,
      HabitoRepository,
    ]),
  ],
  controllers: [
    ExpedienteController,
    AsistenciaController,
    TrasladoController,
    ResultadoLabController,
    PruebaController,
  ],
  providers: [
    ExpedienteService,
    AsistenciaService,
    TrasladoService,
    ResultadoLabService,
    PruebaService,
  ],
})
export class ExpedienteModule {}
