import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {InformacionFinanciera, InformacionFinancieraRelations} from '../models';

export class InformacionFinancieraRepository extends DefaultCrudRepository<
  InformacionFinanciera,
  typeof InformacionFinanciera.prototype.id_informacion_financiera,
  InformacionFinancieraRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(InformacionFinanciera, dataSource);
  }
}
