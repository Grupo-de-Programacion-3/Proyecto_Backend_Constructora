import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Inmueble} from './inmueble.model';
import {Pago} from './pago.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_inmueble: {
        name: 'fk_id_inmueble',
        entity: 'Inmueble',
        entityKey: 'id_inmueble',
        foreignKey: 'inmuebleId',
      },
      fk_id_cliente: {
        name: 'fk_id_cliente',
        entity: 'Cliente',
        entityKey: 'id_cliente',
        foreignKey: 'clienteId',
      }
    },
  },
})
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
