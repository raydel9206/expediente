import { EntityRepository, Repository } from 'typeorm';
import { Evento } from '../entities/evento.entity';
import { TipoBrote } from '../entities/tipobrote.entity';
@EntityRepository(Evento)
export class TipoBroteRepository extends Repository<TipoBrote> {}
