import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,


  patch, post,

  put,

  requestBody,
  response
} from '@loopback/rest';
import {Keys as llaves} from '../config/Keys';
import {Credenciales, ResetearClave, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {FuncionesGeneralesService, NotificacionesService, SesionService} from '../services';


export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(FuncionesGeneralesService)
    public servicioFunciones: FuncionesGeneralesService,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @service(SesionService)
    public servicioSesion: SesionService
  ) { }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id_usuario', 'clave'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id_usuario'>,
  ): Promise<Usuario> {

    let claveAleatoria = this.servicioFunciones.GenerarClaveAleatoria();
    console.log(claveAleatoria);

    let claveCifrada = this.servicioFunciones.CifrarTexto(claveAleatoria);
    console.log(claveCifrada);

    usuario.clave = claveCifrada;

    let usuarioCreado = await this.usuarioRepository.create(usuario);
    if (usuarioCreado) {
      let contenido = `Hola, buen día. <br/> Usted se ha registrado en la plataforma de la Constructora. Sus credenciales de acceso son: <br />
      <ul>
        <li>Usuario: ${usuarioCreado.correo}</li>
        <li>Contraseña: ${claveAleatoria}</li>
      </ul>

      Gracias por confiar en nuestra plataforma de la Constructora.`;
      this.servicioNotificaciones.EnviarCorreoElectrónico(usuarioCreado.correo, llaves.asuntoNuevoUsuario, contenido);
    }



    return usuarioCreado;
  }


  @post('/reset-clave')
  @response(200, {
    content: {'application/json': {schema: getModelSchemaRef(ResetearClave)}},
  })
  async resetClave(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResetearClave),
        },
      },
    })
    resetearClave: ResetearClave,
  ): Promise<Object> {

    let usuario = await this.usuarioRepository.findOne({where: {correo: resetearClave.correo}})
    if (!usuario) {
      throw new HttpErrors[401]("Este usuario no existe");
    }

    let claveAleatoria = this.servicioFunciones.GenerarClaveAleatoria();
    console.log(claveAleatoria);

    let claveCifrada = this.servicioFunciones.CifrarTexto(claveAleatoria);
    console.log(claveCifrada);

    usuario.clave = claveCifrada;

    await this.usuarioRepository.update(usuario);
    let contenido = `Hola, buen día.Usted ha solicitado una nueva clave en la plataforma.Sus datos son:
        <li>Usuario: ${usuario.correo}</li> y Contraseña: ${claveAleatoria}</li>
      </ul>
      Gracias por confiar en nuestra plataforma de la Constructora.`;
    this.servicioNotificaciones.EnviarNotificacionPorSMS(usuario.celular, contenido);
    return {
      envio: "ok"
    };
  }
  @post('/identificar-usuario')
  async vallidar(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: getModelSchemaRef(Credenciales)
          }
        }
      }
    )
    credenciales: Credenciales

  ): Promise<object> {

    let usuario = await this.usuarioRepository.findOne({where: {correo: credenciales.correo, clave: credenciales.clave}});
    if (usuario) {
      //generar token
      let token = this.servicioSesion.GenerarToken(usuario);
      return {
        user: {
          username: usuario.correo,
          role: usuario.rol
        },
        tk: token

      };
    } else {
      throw new HttpErrors[401]("las credenciales no son correctas.");
    }


  }


  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id_usuario}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id_usuario') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id_usuario}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id_usuario') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id_usuario}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id_usuario') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id_usuario}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id_usuario') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
