import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { NomencladoresModule } from './nomencladores/nomencladores.module';
import { ExpedienteModule } from './expediente/expediente.module';
import { EventoModule } from './evento/evento.module';
import { IdentityModule, IdentityOptions } from './identity/identity.module';
import { ConfigModule, ConfigService } from '@atlasjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    NomencladoresModule,
    ExpedienteModule,
    EventoModule,
    ConfigModule.forRoot(),
    IdentityModule.forRootAsync({
      useFactory(c: ConfigService): IdentityOptions {
        return {
          api: c.config.identity.api,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class AppModule {}
