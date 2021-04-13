import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Bloque} from './bloque.model';
import {Ciudad} from './ciudad.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_proy_ciudad: {
        name: 'fk_id_proy_ciudad',
        entity: 'Ciudad',
        entityKey: 'id_ciudad',
        foreignKey: 'ciudadId',
      },
    },
  },
})
export class Proyecto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_proyecto?: number;

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
    type: 'string',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @hasMany(() => Bloque)
  bloques: Bloque[];

  constructor(data?: Partial<Proyecto>) {
    super(data);
  }
}

export interface ProyectoRelations {
  // describe navigational properties here
}

export type ProyectoWithRelations = Proyecto & ProyectoRelations;
