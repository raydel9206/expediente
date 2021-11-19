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
// import { ExpedienteModule } from 'src/expediente/expediente.module';

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
  ],
})
export class NomencladoresModule {}
