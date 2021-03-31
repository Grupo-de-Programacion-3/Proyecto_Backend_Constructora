import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Solicitud,
  Pago,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudPagoController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/pagos', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pago)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pago>,
  ): Promise<Pago[]> {
    return this.solicitudRepository.pagos(id).find(filter);
  }

  @post('/solicituds/{id}/pagos', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.id_solicitud,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPagoInSolicitud',
            exclude: ['id_pago'],
            optional: ['solicitudId']
          }),
        },
      },
    }) pago: Omit<Pago, 'id_pago'>,
  ): Promise<Pago> {
    return this.solicitudRepository.pagos(id).create(pago);
  }

  @patch('/solicituds/{id}/pagos', {
    responses: {
      '200': {
        description: 'Solicitud.Pago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Partial<Pago>,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.solicitudRepository.pagos(id).patch(pago, where);
  }

  @del('/solicituds/{id}/pagos', {
    responses: {
      '200': {
        description: 'Solicitud.Pago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.solicitudRepository.pagos(id).delete(where);
  }
}
