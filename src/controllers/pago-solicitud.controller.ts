import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pago,
  Solicitud,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoSolicitudController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.number('id') id: typeof Pago.prototype.id_pago,
  ): Promise<Solicitud> {
    return this.pagoRepository.solicitud(id);
  }
}
