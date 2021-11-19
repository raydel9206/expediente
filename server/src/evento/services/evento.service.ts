import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventoDto } from '../dto/create-evento.dto';
import { FindPaginationDto } from '../dto/find-pagination.dto';
import { Evento } from '../entities/evento.entity';
import { AntecedenteRepository } from '../../nomencladores/repositories/antecedente.repository';
import { AreaSaludRepository } from '../../nomencladores/repositories/areaSalud.repository';
import { ConsejoRepository } from '../../nomencladores/repositories/consejo.repository';
// import { UpdateEventoDto } from '../dto/update-areaSalud.dto';
import { EventoRepository } from '../repositories/evento.repository';
import { MedidaRepository } from '../repositories/medida.repository';
import { Medida } from '../entities/medida.entity';

@Injectable()
export class EventoService {
  constructor(
    private eventoRepository: EventoRepository,
    private medidaRepository: MedidaRepository,
    private areaSaludRepository: AreaSaludRepository,
    private consejoRepository: ConsejoRepository,
  ) {}

  async findAll(findPaginationDto: FindPaginationDto) {
    const { combo, keyword, take, skip } = findPaginationDto;

    let filter = '';
    if (keyword) filter = keyword.toLowerCase();
    return await this.eventoRepository.findAll(skip, take, keyword);
  }

  async getMedidas(evento_id: string) {
    const id = parseInt(evento_id);
    const entity = await this.eventoRepository.findOne({
      id,
      visible: true,
    });
    if (!entity) {
      throw new NotFoundException('El evento no fué encontrado');
    }

    const medidas = await this.medidaRepository.find({
      where: { evento_id: evento_id },
    });

    return {
      rows: medidas,
    };
  }

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    const {
      denominacion,
      modalidad,
      cerrado,
      fecha_activacion,
      fecha_estimiada_cierre,
      fecha_ultimo_caso,
      fecha_cierre,
      tipo_brote,
      tipo_transmision,
      caso_indice,
      caso_primario,
      observaciones,
      areaSalud_id,
      consejo_id,
      medidas,
    } = createEventoDto;

    const cmf = await this.areaSaludRepository.findOne(areaSalud_id);
    const consejo = await this.consejoRepository.findOne(consejo_id);

    const entity = new Evento();
    entity.denominacion = denominacion;
    entity.modalidad = modalidad;
    entity.cerrado = cerrado;
    entity.fecha_activacion = new Date(fecha_activacion);
    entity.fecha_estimiada_cierre = new Date(fecha_estimiada_cierre);
    entity.fecha_ultimo_caso = new Date(fecha_ultimo_caso);
    entity.fecha_cierre = new Date(fecha_cierre);
    entity.tipo_brote = tipo_brote;
    entity.tipo_transmision = tipo_transmision;
    entity.caso_indice = caso_indice;
    entity.caso_primario = caso_primario;
    entity.observaciones = observaciones;
    entity.cmf = cmf;
    entity.consejo = consejo;
    await entity.save();

    for (const iterator of medidas) {
      const medida = new Medida();
      medida.numero = iterator['numero'];
      medida.medida = iterator['medida'];
      medida.fecha_inicio = new Date(iterator['fecha_inicio']);
      medida.fecha_fin = new Date(iterator['fecha_fin']);
      medida.responsable = iterator['responsable'];
      medida.tipo_accion = iterator['tipo_accion'];
      medida.observaciones = iterator['observaciones'];
      medida.estado = iterator['estado'];
      medida.evento = entity;
      medida.save();
    }
    return entity;
  }

  async findOne(id: number): Promise<Evento> {
    const entity = await this.eventoRepository.findOne({
      id,
      visible: true,
    });
    if (!entity) {
      throw new NotFoundException('El evento no fué encontrado');
    }
    return entity;
  }

  async update(id: number, createEventoDto: CreateEventoDto): Promise<Evento> {
    const {
      denominacion,
      modalidad,
      cerrado,
      fecha_activacion,
      fecha_estimiada_cierre,
      fecha_ultimo_caso,
      fecha_cierre,
      tipo_brote,
      tipo_transmision,
      caso_indice,
      caso_primario,
      observaciones,
      areaSalud_id,
      consejo_id,
      medidas,
    } = createEventoDto;
    const entity = await this.findOne(id);

    const cmf = await this.areaSaludRepository.findOne(areaSalud_id);
    const consejo = await this.consejoRepository.findOne(consejo_id);

    entity.denominacion = denominacion;
    entity.modalidad = modalidad;
    entity.cerrado = cerrado;
    entity.fecha_activacion = new Date(fecha_activacion);
    entity.fecha_estimiada_cierre = new Date(fecha_estimiada_cierre);
    entity.fecha_ultimo_caso = new Date(fecha_ultimo_caso);
    entity.fecha_cierre = new Date(fecha_cierre);
    entity.tipo_brote = tipo_brote;
    entity.tipo_transmision = tipo_transmision;
    entity.caso_indice = caso_indice;
    entity.caso_primario = caso_primario;
    entity.observaciones = observaciones;
    entity.cmf = cmf;
    entity.consejo = consejo;

    await entity.save();

    const medidas_old = await this.medidaRepository.find({
      where: {
        eventoId: id,
      },
    });

    for (const i of medidas_old) {
      i.remove();
    }

    for (const iterator of medidas) {
      const medida = new Medida();
      medida.numero = iterator['numero'];
      medida.medida = iterator['medida'];
      medida.fecha_inicio = new Date(iterator['fecha_inicio']);
      medida.fecha_fin = new Date(iterator['fecha_fin']);
      medida.responsable = iterator['responsable'];
      medida.tipo_accion = iterator['tipo_accion'];
      medida.observaciones = iterator['observaciones'];
      medida.estado = iterator['estado'];
      medida.evento = entity;
      medida.save();
    }

    return entity;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
