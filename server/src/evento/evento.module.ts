import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaSaludRepository } from 'src/nomencladores/repositories/areaSalud.repository';
import { ConsejoRepository } from 'src/nomencladores/repositories/consejo.repository';
import { EventoController } from './controllers/evento.controller';
import { TipoBroteController } from './controllers/tipobrote.controller';
import { EventoRepository } from './repositories/evento.repository';
import { MedidaRepository } from './repositories/medida.repository';
import { TipoBroteRepository } from './repositories/tipobrote.repository';
import { EventoService } from './services/evento.service';
import { TipoBroteService } from './services/tipobrote.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventoRepository,
      MedidaRepository,
      AreaSaludRepository,
      ConsejoRepository,
      TipoBroteRepository
    ]),
  ],
  controllers: [EventoController, TipoBroteController],
  providers: [EventoService, TipoBroteService],
})
export class EventoModule {}
