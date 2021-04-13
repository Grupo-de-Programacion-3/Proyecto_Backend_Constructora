import {Entity, hasMany, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';

@model()
export class Pais extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_pais?: number;

  @property({
    type: 'string',
    required: true,
  })
  Codigo: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @hasMany(() => Ciudad)
  ciudades: Ciudad[];

  constructor(data?: Partial<Pais>) {
    super(data);
  }
}

export interface PaisRelations {
  // describe navigational properties here
}

export type PaisWithRelations = Pais & PaisRelations;
