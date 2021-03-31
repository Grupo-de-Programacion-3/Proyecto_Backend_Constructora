import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class Pago extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_pago?: number;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_pago: string;

  @property({
    type: 'any',
    required: true,
  })
  comprobante_pago: any;

  @belongsTo(() => Solicitud)
  solicitudId: number;

  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;
