import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Pago} from './pago.model';
import {Cliente} from './cliente.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_solicitud?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_solicitud: string;

  @property({
    type: 'number',
    required: true,
  })
  oferta_eco_separarlo: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'any',
    required: true,
  })
  comprobante: any;

  @belongsTo(() => Inmueble)
  inmuebleId: number;

  @hasMany(() => Pago)
  pagos: Pago[];

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
