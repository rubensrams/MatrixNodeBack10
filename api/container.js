//Para inyeccion de dependecias 
const { asClass, createContainer, asFunction, asValue } = require("awilix");

// app start
const StartUp = require("./startup");
const Server = require("./server");
const config = require('../config/enviroments');

//jwt
const jwt = require('jsonwebtoken');

const querystring = require('querystring');
const bcrypt = require('bcryptjs');

//Fyle system
var fs = require('fs');
const path = require('path');
const http = require('http');

//rutas
const Routes = require('../api/routes');
const UsuarioRutas = require('../api/routes/usuario.routes');
const UploadsRutas = require('../api/routes/uploads.routes');
const UploadsAnunciosRutas = require('../api/routes/uploadsanuncios.routes');

//controllers
const { UsuarioController, UploadsController, UploadsAnunciosController } = require('../api/controllers/');

//Services
const { UsuarioService, UploadService } = require("../services");
//db
const db = require("../dal/models");

//Repositories
const { UsuarioRepository, GaleriaRepository, AnuncioRepository } = require("../dal/repositories")


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

        UploadsAnunciosController: asClass(UploadsAnunciosController).singleton(),
        UploadsAnunciosRutas: asFunction(UploadsAnunciosRutas).singleton(),


    })
    .register({
        //configuracion
        config: asValue(config),
        jwt: asValue(jwt),
        fs: asValue(fs),
        path: asValue(path),
        querystring: asValue(querystring),
        bcrypt: asValue(bcrypt),
        http: asValue(http),
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
        UsuarioRepository: asClass(UsuarioRepository).singleton(),
        GaleriaRepository: asClass(GaleriaRepository).singleton(),
        AnuncioRepository: asClass(AnuncioRepository).singleton()
    })


module.exports = container;