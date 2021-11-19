import { IdentityService } from './services/identity.service';
import {
  DynamicModule,
  HttpModule,
  Module,
  ModuleMetadata,
} from '@nestjs/common';
import { IdentityController } from './controllers/identity.controller';

export interface IdentityOptions {
  api: string;
  publish?: boolean;
  timeout?: number;
  maxRedirects?: number;
}

export interface IdentityAsyncOptions {
  useFactory: (any?) => IdentityOptions;
  inject?: any[];
  imports?: any[];
  publish?: boolean;
  timeout?: number;
  maxRedirects?: number;
}

@Module({})
export class IdentityModule {
  static forRoot({
    publish = true,
    timeout,
    maxRedirects,
    ...options
  }: IdentityOptions): DynamicModule {
    return {
      global: true,
      module: IdentityModule,
      imports: [
        HttpModule.register({
          timeout,
          maxRedirects,
        }),
      ],
      controllers: publish ? [IdentityController] : [],
      providers: [
        IdentityService,
        {
          provide: 'IdentityOptions',
          useValue: options ?? {},
        },
      ],
      exports: [IdentityService],
    };
  }

  static forRootAsync({
    useFactory,
    inject,
    imports,
    publish = true,
    timeout,
    maxRedirects,
    ...options
  }: IdentityAsyncOptions): DynamicModule {
    return {
      global: true,
      module: IdentityModule,
      controllers: publish ? [IdentityController] : [],
      imports: [
        HttpModule.register({
          timeout,
          maxRedirects,
        }),
      ].concat((imports ? imports : []) as any[]),
      exports: [IdentityService],
      providers: [
        IdentityService,
        {
          provide: 'IdentityOptions',
          useFactory,
          inject,
        },
      ],
    };
  }
}
