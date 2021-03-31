import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Inmueble, Pago, Cliente} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {PagoRepository} from './pago.repository';
import {ClienteRepository} from './cliente.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id_solicitud,
  SolicitudRelations
> {

  public readonly inmueble: BelongsToAccessor<Inmueble, typeof Solicitud.prototype.id_solicitud>;

  public readonly pagos: HasManyRepositoryFactory<Pago, typeof Solicitud.prototype.id_solicitud>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Solicitud.prototype.id_solicitud>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Solicitud, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.pagos = this.createHasManyRepositoryFactoryFor('pagos', pagoRepositoryGetter,);
    this.registerInclusionResolver('pagos', this.pagos.inclusionResolver);
    this.inmueble = this.createBelongsToAccessorFor('inmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
  }
}
