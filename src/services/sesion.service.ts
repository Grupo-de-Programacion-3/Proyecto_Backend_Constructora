import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/Keys';
import {Usuario} from '../models';
const jwt = require('jsonwebtoken');
@injectable({scope: BindingScope.TRANSIENT})
export class SesionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Funcion que genera un token JWT
   */

  GenerarToken(usuario: Usuario): string {
    let tk = jwt.sign({
      exp: llaves.tiempoVencimientoJWT,
      data: {
        username: usuario.nombres,
        role: usuario.rol
      }
    }, llaves.claveSecretaJWT);
    return tk;
  }
}
