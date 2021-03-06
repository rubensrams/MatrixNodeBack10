const { Router } = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
//Importar libreria para la subida de archivos
const fileUpload = require('express-fileupload');


module.exports = function({ UsuarioRutas, UploadsRutas, UploadsAnunciosRutas }) {
    const router = Router();
    const apiRoute = Router();
    const apiRouteUploadMult = Router();
    //Registrando midlewaren
    apiRoute
    //Permitir peticiones de otro dominio
        .use(cors())
        // midleware sirve para parsear las respuestas del body a un json
        .use(bodyParser.json())
        //Me permitio enviar parametros application/x-www-form-urlencoded como body si no no funciona
        //el req.body.parametro 
        .use(bodyParser.urlencoded({ extended: false }))
        //comprime las peticiones http
        .use(compression())
        //Importar libreria para la subida de archivos
        .use(fileUpload());


    apiRouteUploadMult
    //Permitir peticiones de otro dominio
        .use(cors())
        // midleware sirve para parsear las respuestas del body a un json
        .use(bodyParser.json())
        //Me permitio enviar parametros application/x-www-form-urlencoded como body si no no funciona
        //el req.body.parametro 
        .use(bodyParser.urlencoded({ extended: false }))
        //comprime las peticiones http
        .use(compression())


    apiRoute.use("/seguridad", UsuarioRutas);
    apiRoute.use("/upload", UploadsRutas);
    router.use("/matrix", apiRoute);

    apiRouteUploadMult.use("/anuncio", UploadsAnunciosRutas);
    router.use("/matrix-upload", apiRouteUploadMult);

    return router;
};