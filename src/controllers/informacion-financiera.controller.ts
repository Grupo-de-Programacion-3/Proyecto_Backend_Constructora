import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {InformacionFinanciera} from '../models';
import {InformacionFinancieraRepository} from '../repositories';

export class InformacionFinancieraController {
  constructor(
    @repository(InformacionFinancieraRepository)
    public informacionFinancieraRepository : InformacionFinancieraRepository,
  ) {}

  @post('/informacion-financiera')
  @response(200, {
    description: 'InformacionFinanciera model instance',
    content: {'application/json': {schema: getModelSchemaRef(InformacionFinanciera)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformacionFinanciera, {
            title: 'NewInformacionFinanciera',
            exclude: ['id_informacion_financiera'],
          }),
        },
      },
    })
    informacionFinanciera: Omit<InformacionFinanciera, 'id_informacion_financiera'>,
  ): Promise<InformacionFinanciera> {
    return this.informacionFinancieraRepository.create(informacionFinanciera);
  }

  @get('/informacion-financiera/count')
  @response(200, {
    description: 'InformacionFinanciera model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InformacionFinanciera) where?: Where<InformacionFinanciera>,
  ): Promise<Count> {
    return this.informacionFinancieraRepository.count(where);
  }

  @get('/informacion-financiera')
  @response(200, {
    description: 'Array of InformacionFinanciera model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InformacionFinanciera, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InformacionFinanciera) filter?: Filter<InformacionFinanciera>,
  ): Promise<InformacionFinanciera[]> {
    return this.informacionFinancieraRepository.find(filter);
  }

  @patch('/informacion-financiera')
  @response(200, {
    description: 'InformacionFinanciera PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformacionFinanciera, {partial: true}),
        },
      },
    })
    informacionFinanciera: InformacionFinanciera,
    @param.where(InformacionFinanciera) where?: Where<InformacionFinanciera>,
  ): Promise<Count> {
    return this.informacionFinancieraRepository.updateAll(informacionFinanciera, where);
  }

  @get('/informacion-financiera/{id}')
  @response(200, {
    description: 'InformacionFinanciera model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InformacionFinanciera, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InformacionFinanciera, {exclude: 'where'}) filter?: FilterExcludingWhere<InformacionFinanciera>
  ): Promise<InformacionFinanciera> {
    return this.informacionFinancieraRepository.findById(id, filter);
  }

  @patch('/informacion-financiera/{id}')
  @response(204, {
    description: 'InformacionFinanciera PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformacionFinanciera, {partial: true}),
        },
      },
    })
    informacionFinanciera: InformacionFinanciera,
  ): Promise<void> {
    await this.informacionFinancieraRepository.updateById(id, informacionFinanciera);
  }

  @put('/informacion-financiera/{id}')
  @response(204, {
    description: 'InformacionFinanciera PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() informacionFinanciera: InformacionFinanciera,
  ): Promise<void> {
    await this.informacionFinancieraRepository.replaceById(id, informacionFinanciera);
  }

  @del('/informacion-financiera/{id}')
  @response(204, {
    description: 'InformacionFinanciera DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.informacionFinancieraRepository.deleteById(id);
  }
}
