import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Cliente, ClienteRelations, Solicitud, Ciudad} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {CiudadRepository} from './ciudad.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id_cliente,
  ClienteRelations
> {

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Cliente.prototype.id_cliente>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Cliente.prototype.id_cliente>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Cliente, dataSource);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
