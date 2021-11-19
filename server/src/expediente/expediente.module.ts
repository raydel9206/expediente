import { forwardRef, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ExpedienteService } from './services/expediente.service';
import { ExpedienteController } from './controllers/expediente.controller';
import { ExpedienteRepository } from './repositories/expediente.repository';
import { SeguimientoService } from './services/seguimiento.service';
import { SeguimientoRepository } from './repositories/seguimiento.repository';
import { SeguimientoController } from './controllers/seguimiento.controller';

import { EstudioService } from './services/estudio.service';
import { EstudioController } from './controllers/estudio.controller';
import { EstudioRepository } from './repositories/estudio.repository';
import { ResultadoLabRepository } from './repositories/resultadolab.repository';
import { ResultadoLabController } from './controllers/resultadolab.controller';
import { ResultadoLabService } from './services/resultadolab.service';
import { PaisRepository } from 'src/nomencladores/repositories/pais.repository';
import { ConsejoRepository } from 'src/nomencladores/repositories/consejo.repository';
import { HospitalRepository } from 'src/nomencladores/repositories/hospital.repository';
import { AreaSaludRepository } from 'src/nomencladores/repositories/areaSalud.repository';
import { PersonaRepository } from 'src/nomencladores/repositories/persona.repository';
import { AntecedenteRepository } from 'src/nomencladores/repositories/antecedente.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExpedienteRepository,
      SeguimientoRepository,
      ResultadoLabRepository,
      EstudioRepository,
      PaisRepository,
      ConsejoRepository,
      HospitalRepository,
      AreaSaludRepository,
      PersonaRepository,
      AntecedenteRepository,
    ]),
  ],
  controllers: [
    ExpedienteController,
    SeguimientoController,
    ResultadoLabController,
    EstudioController,
  ],
  providers: [
    ExpedienteService,
    SeguimientoService,
    ResultadoLabService,
    EstudioService,
  ],
})
export class ExpedienteModule {}
