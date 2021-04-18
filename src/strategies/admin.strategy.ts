import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {SesionService} from '../services';

export class AdminStrategy implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(@service(SesionService)
  public servicioSesion: SesionService
  ) {


  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (!token) {
      throw new HttpErrors[401]("No tiene autorizacion, usted no ha suminstrado un token")
    }
    let datos = this.servicioSesion.VerificarTokenJWT(token);
    if (datos) {
      if (datos.data.rol == "ADMIN") {
        let perfil: UserProfile = Object.assign({
          nombre_usuario: datos.data.username,
          rol: datos.data.rol
        });
        return perfil;
      } else {
        throw new HttpErrors[401]("No tiene autorizacion, usted no tiene el rol para ejecutar esta accion")
      }
    } else {
      throw new HttpErrors[401]("No tiene autorizacion, usted no tiene un token valido")
    }


  }

}
