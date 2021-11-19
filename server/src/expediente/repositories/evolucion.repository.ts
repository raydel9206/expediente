import { EntityRepository, Repository } from 'typeorm';
import { Evolucion } from '../entities/evolucion.entity';
@EntityRepository(Evolucion)
export class EvolucionRepository extends Repository<Evolucion> {}
