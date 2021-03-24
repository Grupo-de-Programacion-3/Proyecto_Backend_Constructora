import {Entity, model, property} from '@loopback/repository';

@model()
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
  valor: string;


  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
