//Para inyeccion de dependecias 
const { asClass, createContainer, asFunction, asValue } = require("awilix");

// app start
const StartUp = require("./startup");
const Server = require("./server");
const config = require('../config/enviroments');

//jwt
const jwt = require('jsonwebtoken');

//Fyle system
var fs = require('fs');
const path = require('path');

//rutas
const Routes = require('../api/routes');
const UsuarioRutas = require('../api/routes/usuario.routes');
const UploadsRutas = require('../api/routes/uploads.routes');

//controllers
const { UsuarioController, UploadsController } = require('../api/controllers/');

//Services
const { UsuarioService, UploadService } = require("../services");
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

        //Controllers
        UsuarioController: asClass(UsuarioController).singleton(),
        UsuarioRutas: asFunction(UsuarioRutas).singleton(),

        UploadsController: asClass(UploadsController).singleton(),
        UploadsRutas: asFunction(UploadsRutas).singleton(),



    })
    .register({
        //configuracion
        config: asValue(config),
        jwt: asValue(jwt),
        fs: asValue(fs),
        path: asValue(path)
    })
    .register({
        //Servicios
        UsuarioService: asClass(UsuarioService).singleton(),
        UploadService: asClass(UploadService).singleton()
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