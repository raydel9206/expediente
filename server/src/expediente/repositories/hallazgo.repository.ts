import { EntityRepository, Repository } from 'typeorm';
import { Hallazgo } from '../entities/hallazgo.entity';
@EntityRepository(Hallazgo)
export class HallazgoRepository extends Repository<Hallazgo> {}
