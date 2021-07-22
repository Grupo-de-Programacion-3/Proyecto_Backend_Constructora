import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Bloque} from './bloque.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_bloque: {
        name: 'fk_id_bloque',
        entity: 'Bloque',
        entityKey: 'id_bloque',
        foreignKey: 'bloqueId',
      },
    },
  },
})
export class Inmueble extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_inmueble?: number;

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => Bloque)
  bloqueId: number;

  @hasMany(() => Solicitud)
  solucitudes: Solicitud[];

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
