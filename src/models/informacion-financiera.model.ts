import {Entity, model, property} from '@loopback/repository';

@model()
export class InformacionFinanciera extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_informacion_financiera?: number;

  @property({
    type: 'string',
    required: true,
  })
  documento_cliente: string;

  @property({
    type: 'number',
    required: true,
  })
  total_ingresos: number;

  @property({
    type: 'string',
    required: true,
  })
  empresa_trabaja: string;

  @property({
    type: 'string',
    required: true,
  })
  cargo: string;

  @property({
    type: 'number',
    required: true,
  })
  salario: number;

  @property({
    type: 'number',
    required: true,
  })
  tiempo_trab_actual: number;

  @property({
    type: 'string',
    required: true,
  })
  nom_ref_familiar: string;

  @property({
    type: 'number',
    required: true,
  })
  tel_ref_familiar: number;

  @property({
    type: 'string',
    required: true,
  })
  nom_ref_personal: string;

  @property({
    type: 'number',
    required: true,
  })
  tel_ref_personal: number;


  constructor(data?: Partial<InformacionFinanciera>) {
    super(data);
  }
}

export interface InformacionFinancieraRelations {
  // describe navigational properties here
}

export type InformacionFinancieraWithRelations = InformacionFinanciera & InformacionFinancieraRelations;
