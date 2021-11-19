import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomencladoresModule } from 'src/nomencladores/nomencladores.module';

@Module({
  imports: [
    forwardRef(() => NomencladoresModule),
    // TypeOrmModule.forFeature([
    //   PaisRepository,
    // ]),
  ],
  controllers: [
    // AntecedenteController,
  ],
  // providers: [AntecedenteService],
})
export class EventoModule {}
