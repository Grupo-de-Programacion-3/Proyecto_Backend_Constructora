import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_inf_finan_clie: {
        name: 'fk_id_inf_finan_clie',
        entity: 'InformacionFinanciera',
        entityKey: 'id_informacion_financiera',
        foreignKey: 'informacionFinancieraId',
      },
      fk_id_clie_ciudad: {
        name: 'fk_id_clie_ciudad',
        entity: 'Ciudad',
        entityKey: 'id_ciudad',
        foreignKey: 'ciudadId',
      }
    },
  },
})
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_cliente?: number;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha_nacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  fotografia: string;

  @property({
    type: 'string',
    required: true,
  })
  num_celular: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  @property({
    type: 'number',
  })
  informacionFinancieraId?: number;

  @belongsTo(() => Ciudad)
  ciudadId: number;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
