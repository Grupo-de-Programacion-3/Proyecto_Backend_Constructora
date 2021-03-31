import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Pais} from './pais.model';
import {Proyecto} from './proyecto.model';

@model()
export class Ciudad extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_ciudad?: number;

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

  @belongsTo(() => Pais)
  paisId: number;

  @hasMany(() => Proyecto)
  proyectos: Proyecto[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
