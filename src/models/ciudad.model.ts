import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Pais} from './pais.model';
import {Proyecto} from './proyecto.model';

@model({
  settings: {
    foreignKeys: {
      fk_pais_id: {
        name: 'fk_pais_id',
        entity: 'pais',
        entityKey: 'id_pais',
        foreignKey: 'paisId',
      },
    },
  },
})
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

  @hasMany(() => Cliente)
  clientes: Cliente[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
