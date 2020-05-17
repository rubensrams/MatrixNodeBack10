//Para inyeccion de dependecias 
const { asClass, createContainer, asFunction, asValue } = require("awilix");
//controllers
const { UsuarioController } = require('../api/controllers/');
// app start
const StartUp = require("./startup");
const Server = require("./server");
const config = require('../config/enviroments');

//jwt
const jwt = require('jsonwebtoken');

//rutas
const Routes = require('../api/routes');
const UsuarioRutas = require('../api/routes/usuario.routes');

//Services
const { UsuarioService } = require("../services");
//db
const db = require("../dal/models");

//Repositories
const { UsuarioRepository } = require("../dal/repositories")


const container = createContainer();

container
    .register({
        //Capa api
        app: asClass(StartUp).singleton(),
        router: asFunction(Routes).singleton(),
        server: asClass(Server).singleton(),
        UsuarioController: asClass(UsuarioController).singleton(),
        UsuarioRutas: asFunction(UsuarioRutas).singleton()
    })
    .register({
        //configuracion
        config: asValue(config),
        jwt: asValue(jwt)
    })
    .register({
        //Servicios
        UsuarioService: asClass(UsuarioService).singleton()
    })
    .register({
        //Base de datos
        db: asValue(db)
    })
    .register({
        //Repositorios
        UsuarioRepository: asClass(UsuarioRepository).singleton()
    })

module.exports = container;